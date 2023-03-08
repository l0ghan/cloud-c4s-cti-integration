sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller'], function (MessageToast, Controller) {
	'use strict';
	return Controller.extend('sap.ui.c4c.widget.App', {
		onInit: function () {
			this.call = false;
			this.Data = { phoneNumber: '+33667744716' };
			this.oModel = new sap.ui.model.json.JSONModel();
			this.oModel.setData(this.Data);
			this.oView.setModel(this.oModel);
			jQuery.sap.registerResourcePath('c4c', 'javascripts/c4c');
			jQuery.sap.require('c4c.cti.integration');
			this._SAPIntegration = new c4c.cti.integration();
		},
		onNotify: function (evt) {
			var param = {};
			param.ANI = this.Data.phoneNumber;
			param.Type = 'CALL';
			param.EventType = 'INBOUND';
			param.Action = 'NOTIFY';
			param.ExternalReferenceID = this.ExternalReferenceID;
			param.ExternalOriginalReferenceID = this.ExternalOriginalReferenceID;
			this._SAPIntegration.sendIncomingCalltoC4C(param);
			this.call = true;
			MessageToast.show('Notification Call');
		},
		onAccept: function (evt) {
			var param = {};
			param.ANI = this.Data.phoneNumber;
			param.Type = 'CALL';
			param.EventType = 'INBOUND';
			param.Action = 'ACCEPT';
			param.ExternalReferenceID = this.ExternalReferenceID;
			param.ExternalOriginalReferenceID = this.ExternalOriginalReferenceID;
			this._SAPIntegration.sendIncomingCalltoC4C(param);
			this.call = true;
			MessageToast.show('Accept Call');
		},
		onReject: function (evt) {
			var param = {};
			param.ANI = this.Data.phoneNumber;
			param.Type = 'CALL';
			param.EventType = 'UPDATEACTIVITY';
			param.Action = 'END';
			param.ExternalReferenceID = this.ExternalReferenceID;
			this._SAPIntegration.sendEndCalltoC4C(param);
			MessageToast.show('End Call');
		},
		generateID: function (evt) {
			this.ExternalReferenceID = Math.random().toString(36).slice(2);
			this.ExternalOriginalReferenceID = Math.random().toString(36).slice(2);
		},
	});
});
