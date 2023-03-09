/**
 * Controller class for socket based example listner
 */
sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller'], function (MessageToast, Controller) {
	'use strict';
	return Controller.extend('sap.ui.c4c.widget.SocketView', {
		onInit: function () {
			this.Data = {};
			this.oModel = new sap.ui.model.json.JSONModel(this.Data);
			this.oView.setModel(this.oModel);

			jQuery.sap.registerResourcePath('c4c', 'javascripts/c4c');
			jQuery.sap.require('c4c.cti.integration');

			this._SAPIntegration = new c4c.cti.integration();
			this._socketConnectionId = this._getSocketConnectionId();

			var sTokenData = '/?token=' + this._socketConnectionId;

			jQuery.sap.registerResourcePath('c4c', 'javascripts/c4c');
			jQuery.sap.require('c4c.socket.SocketHelper');
			jQuery.sap.require('c4c.cti.integration');

			//this.socket = io(sTokenData);
			this.socket = c4c.socket.SocketHelper.getInstance(sTokenData);
			this._SAPIntegration = c4c.cti.integration.getInstance();
		},

		/**
		 * get the socket connection from the page
		 * @private
		 */
		_getSocketConnectionId: function () {
			var randonNumber = Math.floor(Math.random() * 100000000 + 1);
			return randonNumber;
		},

		/**
		 * receive messages from socket connection
		 * @param msg
		 */
		onNewSocketInformation: function (msg) {
			MessageToast.show('new incoming information');
			this.Data.messageText = JSON.stringify(msg);
			this.oModel.setData(this.Data);
			this._SAPIntegration.sendIncomingCalltoC4C(msg);
		},

		/**
		 * Send the message to server via socket connection that has been established
		 */
		onSendMessage: function () {
			console.log(this.Data);
			this.socket.emit(this._socketConnectionId, this.Data);
			MessageToast.show('Call Simulated via Socket');
		},

		/**
		 * demonstration of send request to SAP CTI Local Adapter
		 */
		onSendMessageGet: function () {
			this._SAPIntegration.onSendCallRequestToCTIAdapter(this.Data);
			MessageToast.show('Call Simulated via Get Method');
		},

		/**
		 * send a post Message
		 */
		onSendMessagePost: function () {
			$.post('cti/', this.Data);
			MessageToast.show('Call Simulated via Post Method');
		},
		/**
		 * Start a chat simulation
		 */
		onStartChat: function (evt) {
			if (!this._oChatPopover) {
				this._oChatPopover = sap.ui.xmlfragment('sap.ui.c4c.widget.chat.AgentChat', this);
				this.getView().addDependent(this._oPopover);
			}

			this._oChatPopover.openBy(evt.getSource());
		},

		/**
		 * Read parameters from URL
		 * @param name
		 * @param url
		 * @returns {*}
		 * @private
		 */
		_getParameterByName: function (name, url) {
			if (!url) url = window.location.href;
			name = name.replace(/[\[\]]/g, '\\$&');
			var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, ' '));
		},
	});
});
