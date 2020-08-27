import React from 'react';
import { Application, Graphics, Loader, Sprite, Filter } from 'pixi.js'
import { autobind } from 'core-decorators'
import './index.css'

@autobind
class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.edit2dRef = React.createRef()

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.resources = Loader.shared.resources
  }
  
  componentDidMount() {
    Loader.shared.add([
      'Shaders/backgroundFragment.glsl'
    ]).load(this.init)
  }


  init() {
    this.initApp()
    this.initBackground()
  }

  initApp() {
    this.app = new Application({
      view: this.edit2dRef.current,
      transparent: true,
      backgroundColor: 0xf0f0f0
    })

    this.app.renderer.autoDensity = true
  }

  initBackground() {
    // Create a new empty Sprite and define its size
    const { width, height } = this.state
    const background = Sprite()
    background.width = width
    background.height = height
    // Get the code for the fragment shader from the loaded resources
    const backgroundFragmentShader = this.resources['shaders/backgroundFragment.glsl'].data
    // Create a new Filter using the fragment shader
    // We don't need a custom vertex shader, so we set it as `undefined`
    const backgroundFilter = Filter(undefined, backgroundFragmentShader)
    // Assign the filter to the background Sprite
    background.filters = [backgroundFilter]
    // Add the background to the stage
    this.app.stage.addChild(background)
  }



  render() {
    return (
      <canvas id="edit2d" ref={this.edit2dRef}></canvas>
    )
  }
}

export default Edit;