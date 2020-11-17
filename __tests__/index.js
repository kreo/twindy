const stylus = require('stylus')
const {readFileSync, writeFileSync} = require('fs')


function runStylus(name, done) {
  const expectedPath = __dirname + '/' + name + '-expected.css'
  let template = readFileSync(__dirname + '/' + name + '.styl', 'utf8')
  let expected = null
  try {
    expected = readFileSync(expectedPath, 'utf8')
  } catch (err) {
    console.error('Exception:', err)
  }
  stylus.render(template, {paths: [__dirname]}, function (err, css) {
    if (err) throw err
    console.log(css)
    if (!expected) {
      writeFileSync(expectedPath, css, 'utf8')
    }
    expect(css).toEqual(expected)
    done()
  })
}

describe('Windy', () => {

  it('should be empty', done => {
    runStylus('empty', done)
  })

  it('should reset', done => {
    runStylus('reset', done)
  })

})