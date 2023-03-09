sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller'], function (MessageToast, Controller) {
	'use strict';
	return Controller.extend('sap.ui.c4c.widget.App', {
		onInit: function () {
			this.call = false;
			this.Data = { phoneNumber: '+33667744716', ExternalReferenceID: null, ExternalOriginalReferenceID: null };
			this.oModel = new sap.ui.model.json.JSONModel();
			this.oModel.setData(this.Data);
			this.oView.setModel(this.oModel);
			jQuery.sap.registerResourcePath('c4c', 'javascripts/c4c');
			jQuery.sap.require('c4c.cti.integration');
			this._SAPIntegration = new c4c.cti.integration();
			console.log(this.Data.ExternalReferenceID);
		},
		onNotify: function (evt) {
			var param = {};
			param.ANI = this.Data.phoneNumber;
			param.Type = 'CALL';
			param.EventType = 'INBOUND';
			param.Action = 'NOTIFY';
			param.ExternalReferenceID = this.Data.ExternalReferenceID;
			param.ExternalOriginalReferenceID = this.Data.ExternalOriginalReferenceID;
			this._SAPIntegration.sendIncomingCalltoC4C(param);
			MessageToast.show('Notification Call');
		},
		onAccept: function (evt) {
			var param = {};
			param.ANI = this.Data.phoneNumber;
			param.Type = 'CALL';
			param.EventType = 'INBOUND';
			param.Action = 'ACCEPT';
			param.ExternalReferenceID = this.Data.ExternalReferenceID;
			param.ExternalOriginalReferenceID = this.ExternalOriginalReferenceID;
			this._SAPIntegration.sendIncomingCalltoC4C(param);
			MessageToast.show('Accept Call');
		},
		onReject: function (evt) {
			var param = {};
			param.ANI = this.Data.phoneNumber;
			param.Type = 'CALL';
			param.EventType = 'UPDATEACTIVITY';
			param.Action = 'END';
			param.ExternalReferenceID = this.Data.ExternalReferenceID;
			this._SAPIntegration.sendIncomingCalltoC4C(param);
			MessageToast.show('Refuse Call');
		},
		generateID: function (evt) {
			this.Data.ExternalReferenceID = Math.random().toString(36).slice(2);
			this.Data.ExternalOriginalReferenceID = Math.random().toString(36).slice(2);
			MessageToast.show('New ID Call Generated');
			console.log(this.Data.ExternalReferenceID);
		},
	});
});
