const fs = require('fs')
const { resolve } = require('path') 
const { ApolloServer, gql } = require('apollo-server-koa')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const Koa = require('koa');
const http = require('http');
const auth = require('./src/middlewares/auth.js')

const defaultPath = resolve(__dirname, './src/components/')
const typeDefFileName = 'schema.js'
const resolverFileName = 'resolver.js'
const BookStatus = {
   DELETED: 0,
   NORMAL: 1
}

const linkSchema = gql`
  scalar Date
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`

const typeDefs = gql`
  type Query {
    book: Book
  }

  type Mutation {
    book: Book
  }

  enum BookStatus {
    DELETED
    NORMAL
  }

  type Book {
    id: ID
    title: String
    price: Float
    status: BookStatus
  }
`;

const resolvers = {

   // Apollo Server 允许我们将实际的枚举映射挂载到 resolvers 中（这些映射关系通常维护在服务端的配置文件或数据库中）
   // 任何对于此枚举的数据交换，都会自动将枚举值替换为枚举名，避免了枚举值泄露到客户端的问题
   BookStatus,
 
   Query: {
     book: (parent, args, context, info) => ({
       title:'Don Quixote',
       price: 66.3,
       status: BookStatus.NORMAL
     })
   },
};

const isProd = process.env.NODE_ENV === 'production'

function generateTypeDefsAndResolvers () {
  const typeDefs = [linkSchema]
  const resolvers = {}

  const _generateAllComponentRecursive = (path = defaultPath) => {
    const list = fs.readdirSync(path)

    list.forEach(item => {
      const resolverPath = path + '/' + item
      const stat = fs.statSync(resolverPath)
      const isDir = stat.isDirectory()
      const isFile = stat.isFile()
      if (isDir) {
        _generateAllComponentRecursive(resolverPath)
      } else if (isFile && item === typeDefFileName) {
          const { schema } = require(resolverPath)
          typeDefs.push(schema)
      } else if (isFile && item === resolverFileName) {
           const resolversPerFile = require(resolverPath)
          Object.keys(resolversPerFile).forEach(k => {
                if (!resolvers[k]) resolvers[k] = {}
                resolvers[k] = { ...resolvers[k], ...resolversPerFile[k] }
                console.log('resolvers', resolvers[k])
            })
      }
    })
  }

  _generateAllComponentRecursive()

  return { typeDefs, resolvers }
}

const apolloServerOptions = {
  ...generateTypeDefsAndResolvers(),
  formatError: error => ({
    code: error.extensions.code,
    message: error.message
  }),
  introspection: !isProd,
  playground: !isProd,
  mocks: false
}

async function startApolloServer(typeDefs, resolvers) {
  const httpServer = http.createServer();
  const server = new ApolloServer({ ...apolloServerOptions });
  await server.start();
  const app = new Koa();
  app.use(auth)
  server.applyMiddleware({ app });
  httpServer.on('request', app.callback());
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer(typeDefs, resolvers)