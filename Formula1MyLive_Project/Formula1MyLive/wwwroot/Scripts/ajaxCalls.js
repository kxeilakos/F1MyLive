function CallWS(type, url, dataType, request, contentType, callback) {

	$.ajax({
		type: type,
		contentType: contentType,
		url: url,
		dataType: dataType,
		data: JSON.stringify(request),
		success: function (data) {
			console.log(data);
			if (callback) callback(data);
		},
		failure: function (data) {
			console.log(data);
		},
		error: function (data) {
			console.log(data);
		}

	});
}