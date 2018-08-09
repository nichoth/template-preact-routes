var { h, render } = require('preact')
var connect = require('@nichoth/preact-connect')
var Bus = require('@nichoth/events')
var { struct, observ } = require('./lib')
var Effects = require('./effects')
var View = require('./view')
var evs = require('./EVENTS')

var bus = Bus({ memo: true })
var state = struct({
    foo: observ('bar'),
    route: struct({}),
    homeRoute: struct({
        hello: observ('world')
    })
})

var effects = Effects({ state, view: bus })

if (process.env.NODE_ENV === 'development') {
    window.app = {
        state,
        effects,
        view: bus,
        evs
    }
}

var _view = connect({ state, bus, view: View })
render(h(_view), document.getElementById('content'))

