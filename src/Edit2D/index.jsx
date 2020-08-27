import React from 'react';
import { Application, Graphics } from 'pixi.js'
import './index.css'

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.editRef = React.createRef()
  }
  
  componentDidMount() {
    this.initApp()
    this.drawGrid()
  }
  initApp() {
    console.log(this.editRef)
    this.app = new Application({
      view: this.editRef.current,
      transparent: true,
    })
  }

  drawGrid() {
    const {height, width } = this.app.renderer
    const line = new Graphics();
    line.lineStyle(1, 0xcccccc, 1);

    for (let i = 0; i < height; i += 50) {
      line.moveTo(0, i)
      line.lineTo(width, i)
    }
    for (let i = 0; i < width; i += 50) {
      line.moveTo(i, 0)
      line.lineTo(i, height)
    }

    line.interactive = true
    line.mouseover= function(ev) {
      console.log(ev)
    }
    
    this.app.stage.addChild(line);
  }

  render() {
    return (
      <canvas id="edit" ref={this.editRef}></canvas>
    )
  }
}

export default Edit;