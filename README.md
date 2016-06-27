# JavaScript Observer

Simple observer pattern implementation on JavaScript for browser and Node.js environment

### Interface

Class has a classic interface:

```code
Observer.prototype.on = function({string} event, {function} callback)
Observer.prototype.trigger = function({string} event[, arguments])
Observer.prototype.off = function()
Observer.prototype.off = function({string} event)
Observer.prototype.off = function({string} event, {function} callback)
```

Subscribe method **on** returns an interface for this subscription:

```code
Subscription.remove = function()
```