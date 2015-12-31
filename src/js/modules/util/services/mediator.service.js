angular
  .module('ngUtil')
  .service('$mediator', $mediator)

$mediator.$inject = ['$q', '$log'];

function $mediator($q, $log) {

  var channels = {};
  var subscriberId = 0;

  this.signal = function(channel, publisher, data) {
    if (!hasSubscriber(channel)) {
      return;
    }

    var subscribers = channels[channel];

    _.map(subscribers, function(subscriber) {
      try {
        subscriber.callback(data);
      } catch (e) {
        $log.error(e, publisher, subscriber.name)
      }
    });
  };

  this.connect = function(channel, subscriber, callback) {
    if (!hasSubscriber(channel)) {
      channels[channel] = [];
    }

    channels[channel].push({
      "callback": callback,
      "name": subscriber,
      "subscriberId": ++subscriberId
    });

    return function() {
      disconnect(subscriberId);
    };
  };

  function hasSubscriber(channel) {
    return _.has(channels, channel);
  };

  function disconnect(subscriberId) {
    channels = _.map(channels, function(channel) {
      return _.filter(channel, function(subscriber) {
        return subscriber.subscriberId !== subscriberId;
      });
    });
  };

  return this;
};
