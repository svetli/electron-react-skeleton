import { app, BrowserWindow } from 'electron'
import * as path from 'path'

let mainWindow: BrowserWindow | null = null

app.on('window-all-closed', app.quit)
app.on('before-quit', () => {
  process.exit(0)
})

app.on('ready', () => {
  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    width: 960,
    height: 660,
    show: false,
  }

  mainWindow = new BrowserWindow(windowOptions)
  mainWindow.on('ready-to-show', mainWindow.show)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.setVisualZoomLevelLimits(1, 1)

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`)
})
