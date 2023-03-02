const fs = require('fs').promises

async function main() {
    const files = await readFile('num')
    console.log(files)
}

main()

async function readFile(folderName) {
    let alchemyFiles = []
    const items = await fs.readdir(folderName, {withFileTypes: true})
    for(const item of items){
        if(item.isDirectory()){
            alchemyFiles = alchemyFiles.concat(await readFile(`${folderName}/${item.name}`))
        }
        else{
            if(item.name==='alchemy.txt'){
                alchemyFiles.push(`${folderName}/${item.name}`)
            }
        }
    } 
    return alchemyFiles
}