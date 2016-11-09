require.config({
  'map': {
    '*': {
      'amp-contains@^1.0.1': 'amp-contains@1.0.1',
      'amp-map@^1.0.1': 'amp-map@1.0.1',
      'backbone@^1.1.2': 'backbone@1.1.2',
      'cajon@^0.2.5': 'cajon@0.2.5',
      'jquery@^2.1.3': 'jquery@2.1.3',
      'moment@^2.9.0': 'moment@2.9.0',
      'most@^0.10.1': 'most@0.10.1',
      'when@^3.6.4': 'when@3.6.4',
      'amp-index-of@^1.0.0': 'amp-index-of@1.1.0',
      'amp-values@^1.0.0': 'amp-values@1.0.1',
      'amp-iteratee@^1.0.0': 'amp-iteratee@1.0.1',
      'amp-keys@^1.0.0': 'amp-keys@1.0.1',
      'underscore@>=1.5.0': 'underscore@1.7.0',
      'when@~3.6.4': 'when@3.6.4',
      'amp-is-number@^1.0.0': 'amp-is-number@1.0.1',
      'amp-create-callback@^1.0.0': 'amp-create-callback@1.0.1',
      'amp-is-function@^1.0.0': 'amp-is-function@1.0.1',
      'amp-is-object@^1.0.0': 'amp-is-object@1.0.1',
      'amp-matches@^1.0.0': 'amp-matches@1.0.1',
      'amp-property@^1.0.0': 'amp-property@1.0.2',
      'amp-has@^1.0.0': 'amp-has@1.0.1',
      'amp-pairs@^1.0.0': 'amp-pairs@1.0.1',
      'amp-contains': 'amp-contains@1.0.1',
      'amp-map': 'amp-map@1.0.1',
      'backbone': 'backbone@1.1.2',
      'cajon': 'cajon@0.2.5',
      'jquery': 'jquery@2.1.3',
      'moment': 'moment@2.9.0',
      'most': 'most@0.10.1',
      'when': 'when@3.6.4'
    },
    'amp-contains@1.0.1': {
      'amp-index-of': 'amp-index-of@1.1.0',
      'amp-values': 'amp-values@1.0.1'
    },
    'amp-map@1.0.1': {
      'amp-iteratee': 'amp-iteratee@1.0.1',
      'amp-keys': 'amp-keys@1.0.1'
    },
    'backbone@1.1.2': {
      'underscore': 'underscore@1.7.0'
    },
    'most@0.10.1': {
      'when': 'when@3.6.4'
    },
    'when@3.6.4': {
      'vertx': false
    },
    'amp-index-of@1.1.0': {
      'amp-is-number': 'amp-is-number@1.0.1'
    },
    'amp-values@1.0.1': {
      'amp-keys': 'amp-keys@1.0.1'
    },
    'amp-iteratee@1.0.1': {
      'amp-create-callback': 'amp-create-callback@1.0.1',
      'amp-is-function': 'amp-is-function@1.0.1',
      'amp-is-object': 'amp-is-object@1.0.1',
      'amp-matches': 'amp-matches@1.0.1',
      'amp-property': 'amp-property@1.0.2'
    },
    'amp-keys@1.0.1': {
      'amp-has': 'amp-has@1.0.1',
      'amp-index-of': 'amp-index-of@1.1.0',
      'amp-is-object': 'amp-is-object@1.0.1'
    },
    'amp-matches@1.0.1': {
      'amp-pairs': 'amp-pairs@1.0.1'
    },
    'amp-pairs@1.0.1': {
      'amp-keys': 'amp-keys@1.0.1'
    }
  },
  'packages': [
    {
      'name': 'amp-contains@1.0.1',
      'main': 'contains.js',
      'location': 'node_modules/amp-contains'
    },
    {
      'name': 'amp-map@1.0.1',
      'main': 'map.js',
      'location': 'node_modules/amp-map'
    },
    {
      'name': 'backbone@1.1.2',
      'main': 'backbone.js',
      'location': 'node_modules/backbone'
    },
    {
      'name': 'cajon@0.2.5',
      'main': 'cajon.js',
      'location': 'node_modules/cajon'
    },
    {
      'name': 'jquery@2.1.3',
      'main': 'dist/jquery.js',
      'location': 'node_modules/jquery'
    },
    {
      'name': 'moment@2.9.0',
      'main': './moment.js',
      'location': 'node_modules/moment'
    },
    {
      'name': 'most@0.10.1',
      'main': 'most.js',
      'location': 'node_modules/most'
    },
    {
      'name': 'when@3.6.4',
      'main': 'when',
      'location': 'node_modules/when'
    },
    {
      'name': 'amp-index-of@1.1.0',
      'main': 'index-of.js',
      'location': 'node_modules/amp-contains/node_modules/amp-index-of'
    },
    {
      'name': 'amp-values@1.0.1',
      'main': 'values.js',
      'location': 'node_modules/amp-contains/node_modules/amp-values'
    },
    {
      'name': 'amp-iteratee@1.0.1',
      'main': 'iteratee.js',
      'location': 'node_modules/amp-map/node_modules/amp-iteratee'
    },
    {
      'name': 'amp-keys@1.0.1',
      'main': 'keys.js',
      'location': 'node_modules/amp-map/node_modules/amp-keys'
    },
    {
      'name': 'underscore@1.7.0',
      'main': 'underscore.js',
      'location': 'node_modules/backbone/node_modules/underscore'
    },
    {
      'name': 'amp-is-number@1.0.1',
      'main': 'is-number.js',
      'location': 'node_modules/amp-contains/node_modules/amp-index-of/node_modules/amp-is-number'
    },
    {
      'name': 'amp-create-callback@1.0.1',
      'main': 'create-callback.js',
      'location': 'node_modules/amp-map/node_modules/amp-iteratee/node_modules/amp-create-callback'
    },
    {
      'name': 'amp-is-function@1.0.1',
      'main': 'is-function.js',
      'location': 'node_modules/amp-map/node_modules/amp-iteratee/node_modules/amp-is-function'
    },
    {
      'name': 'amp-is-object@1.0.1',
      'main': 'is-object.js',
      'location': 'node_modules/amp-map/node_modules/amp-iteratee/node_modules/amp-is-object'
    },
    {
      'name': 'amp-matches@1.0.1',
      'main': 'matches.js',
      'location': 'node_modules/amp-map/node_modules/amp-iteratee/node_modules/amp-matches'
    },
    {
      'name': 'amp-property@1.0.2',
      'main': 'property.js',
      'location': 'node_modules/amp-map/node_modules/amp-iteratee/node_modules/amp-property'
    },
    {
      'name': 'amp-has@1.0.1',
      'main': 'has.js',
      'location': 'node_modules/amp-map/node_modules/amp-keys/node_modules/amp-has'
    },
    {
      'name': 'amp-pairs@1.0.1',
      'main': 'pairs.js',
      'location': 'node_modules/amp-map/node_modules/amp-iteratee/node_modules/amp-matches/node_modules/amp-pairs'
    }
  ]
})
