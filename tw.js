var Tw = {
	bindings: {},

	init: function(bindings) {
		var self = this;

		self.bindings = bindings || {};

		self.getBindings().forEach(function(element, index, value) {
			var _self = value[index],
				key = _self.getAttribute('data-bind'),
				hasVal = (Tw.is(_self, 'SELECT OPTIONS INPUT TEXTAREA')),
				keyup = (Tw.is(_self, 'INPUT TEXTAREA'));

			_self[hasVal ? 'value' : 'innerHTML'] = self.bindings[key];

			_self.addEventListener('keyup', function() {
				self.bindings[key] = hasVal ? _self.value : _self.innerHTML;
			});

			_self.addEventListener('change', function() {
				self.bindings[key] = hasVal ? _self.value : _self.innerHTML;
			});

			Object.observe(self.bindings, function(obj) {
				self.observer(_self, obj, key);
			});
		});
	},

	getBindings: function() {
		var elements = [],
			allElements = document.getElementsByTagName('*'),
			len = allElements.length,
			i;

		for(i = 0; i < len; ++i) {
			if(allElements[i].getAttribute('data-bind') !== null) {
				elements.push(allElements[i]);
			}
		}

		return elements;
	},

	is: function(node, names) {
		if(names.split(' ').length > 1) {
			var i,
				arr = names.split(' '),
				len = arr.length;

			for(i = 0; i < len; ++i) {
				if(arr[i].toUpperCase() == node.nodeName.toUpperCase()) {
					return true;
				} else if(i + 1 >= len){
					return false;
				}
			}
		} else {
			return (names.toUpperCase() == node.nodeName.toUpperCase());
		}
	},

	observer: function(element, obj, key) {
		element[Tw.is(element, 'SELECT OPTIONS INPUT TEXTAREA') ? 'value' : 'innerHTML'] = obj[0].object[key];
	}
};