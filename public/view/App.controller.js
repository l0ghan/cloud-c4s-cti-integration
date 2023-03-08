sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller'], function (MessageToast, Controller) {
	'use strict';
	return Controller.extend('sap.ui.c4c.widget.App', {
		onInit: function () {
			this.call = false;
			this.Data = { phoneNumber: '13131313' };
			this.oModel = new sap.ui.model.json.JSONModel();
			this.oModel.setData(this.Data);
			this.oView.setModel(this.oModel);
			jQuery.sap.registerResourcePath('c4c', 'javascripts/c4c');
			jQuery.sap.require('c4c.cti.integration');
			this._SAPIntegration = new c4c.cti.integration();
		},
		onAccept: function (evt) {
			var param = {};
			param.ANI = this.Data.phoneNumber;
			param.Type = 'CALL';
			param.EventType = 'INBOUND';
			param.Action = 'NOTIFY';
			param.ExternalReferenceID = 'ED4E4730D1C711EAAA5EBC019352B05E';
			param.ExternalOriginalReferenceID = 'E0163EA718FC1FFABDD5608C895AEF67';
			this._SAPIntegration.sendIncomingCalltoC4C(param);
			this.call = true;
			MessageToast.show('Start Call');
		},
		onReject: function (evt) {
			console.log(this.call);
			var param = {};
			param.ANI = this.Data.phoneNumber;
			param.Type = 'CALL';
			param.EventType = 'UPDATEACTIVITY';
			param.Action = 'END';
			param.ExternalReferenceID = 'ED4E4730D1C711EAAA5EBC019352B05E';
			this._SAPIntegration.sendEndCalltoC4C(param);
			MessageToast.show('End Call');
		},
	});
});
