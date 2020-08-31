// It is required to set the float precision for fragment shaders in OpenGL ES
// More info here: https://stackoverflow.com/a/28540641/4908989
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uPointerDiff;


// This function returns 1 if `coord` correspond to a grid line, 0 otherwise
float isGridLine (vec2 coord) {
  vec2 pixelsPerGrid = vec2(100.0, 100.0);
  vec2 gridCoords = fract(coord / pixelsPerGrid);
  vec2 gridPixelCoords = gridCoords * pixelsPerGrid;
  vec2 gridLine = step(gridPixelCoords, vec2(1.0));
  float isGridLine = max(gridLine.x, gridLine.y);
  return isGridLine;
}

// Main function
void main () {
  // Coordinates for the current pixel
  vec2 coord = gl_FragCoord.xy - uPointerDiff;
  // Set `color` to black
  vec3 color = vec3(0.96);
  // If it is a grid line, change blue channel to 0.3

  if (isGridLine(coord) == 1.0) {
    color.r = color.g = color.b = 1.0;
  }
 
  // Assing the final rgba color to `gl_FragColor`
  gl_FragColor = vec4(color, 1.0);
}