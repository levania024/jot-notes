import { Jot } from './models/Jot.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /**@type {Jot[]} */
  jotNote = [
    new Jot({
      name: 'HTML',
      color: '#270cf4',
      body: 'HTML stands for Hypertext Markup Language.',
    }),
    new Jot({
      name: 'Css',
      color: '#2a9920',
      body: 'CSS is the language we use to style an HTML document.',
    }),
    new Jot({
      name: 'JavaScript',
      color: '#f41f0c',
      body: 'JavaScript.com is a resource for the JavaScript community.',
    })
  ]

  /**@type {Jot} */
  activeJotNote = null
}

export const AppState = createObservableProxy(new ObservableAppState())