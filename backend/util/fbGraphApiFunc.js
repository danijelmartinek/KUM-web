const getFbDataParams = (fb, fbParams, graphApi, options) => {
	return new Promise((resolve, reject) => {
        fbParams.user.accessToken = fb.access_token
	 
		graphApi.setOptions(options)
		.get("/me",(err, res) => {
			if(err){
				resolve({
					success: false,
					message: "Can't get data of user."
				}) 
			}
			fbParams.user.name = res.name
			fbParams.user.id = res.id
		})

		graphApi.setOptions(options)
		.get("/me/accounts",(err, res) => {
			if(err){
				resolve({
					success: false,
					message: "Can't get data of user accounts."
				}) 
			}
			res.data.forEach(acc => {
				if(acc.name == fbParams.page.name){
					fbParams.page.accessToken = acc.access_token
					fbParams.page.id = acc.id
					resolve({
						success: true,
						message: "Facebook params saved."
					}) 
				}
			})
			resolve({
				success: false,
				message: "Can't find selected page."
			}) 
		})
    })
}

const fbEventGet = (FBevent) => {

	let eventTimes = []
	if(FBevent.event_times){
		FBevent.event_times.forEach((time) => {
			eventTimes.push({
				startTime: new Date(time.start_time),
				endTime: new Date(time.end_time),
				id: time.id
			})
		})
	}

	let admins = []
	if(FBevent.admins){
		FBevent.admins.data.forEach((admin) => {
			admins.push({
				name: admin.name,
				username: admin.username,
				profileType: admin.profile_type,
				picLarge: admin.pic_large,
				picSmall: admin.pic_small,
				link: admin.link,
				id: admin.id
			})
		})
	}

	let place = {}
	if(FBevent.place){

		let location = {}
		if(FBevent.place.location){
			location = {
				city: FBevent.place.location.city || '',
				country: FBevent.place.location.country || '',
				latitude: FBevent.place.location.latitude || 0,
				longitude: FBevent.place.location.longitude || 0,
				street: FBevent.place.location.street || '',
				zip: FBevent.place.location.zip || ''
			}
		}

		place = {
			name: FBevent.place.name || '',
			location: location,
			id: FBevent.place.id || ''
		}
	}

	let cover = {}
	if(FBevent.cover){
		cover = {
			offsetX: FBevent.cover.offest_x || 50,
			offsetY: FBevent.cover.offset_y || 50,
			source: FBevent.cover.source || '',
			id: FBevent.cover.id || ''
		}
	}


	let event = {
		fbId: FBevent.id,
		name: FBevent.name,
		owner: {
			name: FBevent.owner.name,
			id: FBevent.owner.id
		},
		startTime: new Date(FBevent.start_time) || '',
		endTime: new Date(FBevent.end_time) || '',
		eventTimes : eventTimes,
		place: place,
		description: FBevent.description || '',
		category: FBevent.category || '',
		publishStatus: "draft",
		attendingCount: FBevent.attending_count || 0,
		maybeCount: FBevent.maybe_count || 0,
		interestedCount: FBevent.interested_count || 0,
		declinedCount: FBevent.declined_count || 0,
		noreplyCount: FBevent.noreply_count || 0,
		cover: cover,
		admins: admins,
		ticketUri: FBevent.ticket_uri || '',
		ticketUriStartSalesTime: FBevent.ticket_uri_start_sales_time || '',
		ticketingPrivacyUri: FBevent.ticketing_privacy_uri || '',
		ticketingTermsUri: FBevent.ticketing_terms_uri || '',
		fbUpdatedTime: FBevent.updated_time || '',
		createdAt: Date.now(),
		updatedAt: Date.now()
	}

	return event
}


module.exports = {
    fbEventGet,
    getFbDataParams
}