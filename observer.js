!function() {

    var root = this;

    // set up Observer
    if (typeof exports != 'undefined') {
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = Observer;
        }
        exports.Observer = Observer;
    }
    else {
        root.Observer = Observer;
    }

    /**
     * Observer class
     *
     * @constructor Observer
     */
    function Observer() {
        this._topics = {};
    }

    /**
     * Observer subscribe method
     *
     * @method Observer.prototype.on
     * @param {string} event
     * @param {function} callback
     * @returns {object}
     */
    Observer.prototype.on = function(event, callback) {
        var that = this;

        // get or init named topic
        var topic = this._topics[event] || (this._topics[event] = { queue: [] });
        // push callback to topic queue
        topic.queue.push(callback);

        return {
            // remove method for this callback
            remove: function() {
                return that.off(event, callback);
            }
        }
    };

    /**
     * Observer publish method
     *
     * @method Observer.prototype.trigger
     * @param {string} event
     * @returns {undefined}
     */
    Observer.prototype.trigger = function(event) {
        var topic = this._topics[event];
        if (typeof topic != 'undefined' && topic.queue.length) {
            // get arguments to pass
            var args = Array.prototype.slice.call(arguments, 1);
            // call all callbacks in topic queue
            for (var i = 0; i !== topic.queue.length; i++) {
                topic.queue[i].apply(this, args);
            }
        }
    };

    /**
     * Observer unsubscribe method
     *
     * @method Observer.prototype.off
     * @param {string} event
     * @param {function} callback, Optional
     * @returns {undefined}
     */
    Observer.prototype.off = function(event, callback) {
        // off all events
        if (!arguments.length) {
            this._topics = {};
        }
        else {
            var topic = this._topics[event];
            if (typeof topic != 'undefined') {
                // off event for topic
                if (arguments.length === 1 || typeof callback != 'function') {
                    topic.queue.length = 0;
                }
                // off callback for topic event
                else {
                    for (var i = 0; i !== topic.queue.length; i++) {
                        if (topic.queue[i] === callback) {
                            topic.queue.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }

    };

}();
