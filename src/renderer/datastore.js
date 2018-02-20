import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

console.log('用户文件夹', remote.app.getPath('userData'))

export default new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db')
})
