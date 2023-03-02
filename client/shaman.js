
const fs = require('fs').promises
const path = require('path')

async function main() {
    const files = await readFile(path.join(__dirname, '/fst'))
    const reportDir = path.join(__dirname, 'report')
    try{
        await fs.mkdir(reportDir)
    }
    catch{
        console.log(`${reportDir} already exsits`)
    }
    
    const alchemistTotal = await calculateFileTotal(files)
    const report = {
        alchemistTotal,
        totalStores: files.length
    }

    const reportPath = path.join(reportDir, 'report.json')
    try{
        await fs.unlink(reportPath)
    }
    catch{
        console.log('fail to remove' + reportPath)
    }
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2))
    console.log(`report written to ${reportDir}`)
}

main()

async function readFile(folderName) {
    let alchemyFiles = []
    const items = await fs.readdir(folderName, {withFileTypes: true})
    for(const item of items){
        if(item.isDirectory()){
            alchemyFiles = alchemyFiles.concat(await readFile(path.join(`${folderName}`,`${item.name}`)))
        }
        else{
            if(path.extname(item.name) === '.json'){
                alchemyFiles.push(path.join(`${folderName}`, `${item.name}`))
            }
        }
    } 
    return alchemyFiles
}

async function calculateFileTotal(salesFiles) {
    let alchemistTotal = 0
    for(file of salesFiles){
        const data = JSON.parse(await fs.readFile(file))
        alchemistTotal += data.total
    }
    return alchemistTotal
}