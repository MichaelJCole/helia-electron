/* eslint-disable no-console */

const { app, BrowserWindow } = require('electron')

/**
 * Added to test without dynamic import 
import { createHelia } from 'helia'

export async function createNode () {
  return await createHelia()
}
*/

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', async () => {
  createWindow()

  try {
    // Helia is an ESM-only module but Electron currently only supports CJS
    // at the top level, so we have to use dynamic imports to load it
    // const { createNode } = await import('./helia.mjs')
    //const node = await createNode()

    const { createHelia } = await import('helia')
    const node = createHelia()
    const id = node.libp2p.peerId
    console.log(id)
  } catch (err) {
    console.error(err)
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
