const fs = require('fs/promises')
const path = require('path')

const letterFiles = {
  "moving": [],
  "master1": [],
  "master2": []
}
fs.readdir('./src/moving')
.then(files => {
  for (const file of files) {
    if(path.extname(file) === '.js') letterFiles['moving'].push(`./src/moving/${file}`)
  }
})
.then(() => {
  return fs.readdir('./src/m1src')
})
.then((files) => {
  for (const file of files) {
    if(path.extname(file) === '.js') letterFiles['master1'].push(`./src/m1src/${file}`)
  }
})
.then(() => {
  return fs.readdir('./src/m2src')
})
.then((files) => {
  for (const file of files) {
    if(path.extname(file) === '.js') letterFiles['master2'].push(`./src/m2src/${file}`)
  }
})
.then(() => {
  fs.writeFile('./data.json', JSON.stringify(letterFiles), (err) => {
    if(err) console.log(err)
  })
})




