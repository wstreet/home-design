import React from 'react';
import { Application, Graphics, Loader, Sprite, Filter, Point } from 'pixi.js'
import { autobind } from 'core-decorators'
import './index.css'
/**
 * 参考
 * https://css-tricks.com/building-an-images-gallery-using-pixijs-and-webgl/
 */

@autobind
class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.edit2dRef = React.createRef()

    this.resources = Loader.shared.resources
    this.pointerDownTarget = 0

    this.pointerStart = new Point()
    this.pointerDiffStart = new Point()
    this.diffX = 0
    this.diffY = 0
  }
  
  componentDidMount() {
    Loader.shared
    .add('backgroundFsh', 'shaders/background.fsh')
    .add('stageFsh', 'shaders/stage.fsh')
    .load(this.init)
  }

  onResize() {
    const width =window.innerWidth
    const height = window.innerHeight

    // 更新uniforms网格宽高
    this.uniforms.uResolution.x = width
    this.uniforms.uResolution.y = height

    this.app.view.width = width
    this.app.view.height = height

    this.app.view.style.width = width + 'px'
    this.app.view.style.height = height + 'px'
  }


  init() {
    this.initUniforms()
    this.initApp()
    this.initBackground()
    this.initEvents()

    this.app.ticker.add(() => {
      // Multiply the values by a coefficient to get a smooth animation
      this.uniforms.uPointerDiff.x += (this.diffX - this.uniforms.uPointerDiff.x) * 0.2
      this.uniforms.uPointerDiff.y += (this.diffY - this.uniforms.uPointerDiff.y) * 0.2
    })
  }

  initApp() {
    this.app = new Application({
      view: this.edit2dRef.current,
      transparent: true,
      backgroundColor: 0xf0f0f0
    })

    this.app.renderer.autoDensity = true

    const stageFsh = this.resources['stageFsh'].data
    const stageFilter = new Filter(undefined, stageFsh, this.uniforms)
    this.app.stage.filters = [stageFilter]
  }

  initBackground() {
    // Create a new empty Sprite and define its size
    const background = new Sprite()
    background.width = window.innerWidth
    background.height = window.innerHeight
    // Get the code for the fragment shader from the loaded resources
    const backgroundFsh = this.resources['backgroundFsh'].data
    // Create a new Filter using the fragment shader
    // We don't need a custom vertex shader, so we set it as `undefined`
    const backgroundFilter = new Filter(undefined, backgroundFsh, this.uniforms)
    // Assign the filter to the background Sprite
    background.filters = [backgroundFilter]
    // Add the background to the stage
    this.app.stage.addChild(background)

    this.background = background

  }

  initEvents() {
    window.addEventListener('resize', this.onResize)

    // TODO: 禁止canvas的contextmenu ... 没生效
    this.edit2dRef.current.addEventListener('oncontextmenu', () => {return false})

    this.app.stage.interactive = true

    // Pointer & touch events are normalized into
    // the `pointer*` events for handling different events
    this.app.stage
    .on('pointerdown', this.onPointerDown)
    .on('pointerup', this.onPointerUp)
    .on('pointerupoutside', this.onPointerUp)
    .on('pointermove', this.onPointerMove)
  }

  initUniforms() {
    const width =window.innerWidth
    const height = window.innerHeight
    this.uniforms = {
      uResolution: new Point(width, height),
      uPointerDiff: new Point(),
      uPointerDown: this.pointerDownTarget
    }
  }

  onPointerDown(e) {
    const { x, y } = e.data.global
    this.pointerDownTarget = 1
    this.pointerStart.set(x, y)
    this.pointerDiffStart = this.uniforms.uPointerDiff.clone()

    this.handleCursor()
  }

  onPointerUp() {
    this.pointerDownTarget = 0

    this.handleCursor()
  }

  onPointerMove(e) {
    const { x, y } = e.data.global
    if (this.pointerDownTarget) {
      this.diffX = this.pointerDiffStart.x + (x - this.pointerStart.x)
      this.diffY = this.pointerDiffStart.y + (y - this.pointerStart.y)
    }
  }

  handleCursor() {
    if (this.pointerDownTarget) {
      this.app.stage.cursor = 'grabbing'
    } else {
      this.app.stage.cursor = 'default'
    }
  }


  render() {
    return (
      <canvas id="edit2d" ref={this.edit2dRef}></canvas>
    )
  }
}

export default Edit;