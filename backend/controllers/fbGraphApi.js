const graph = require('fbgraph')
const { fbEventGet, getFbDataParams } = require('./../util/fbGraphApiFunc.js')

const Event = require('./../models/event.js')

//-------------------------------------------------
const facebookAuth = {
	clientId: "",
	clientSecret: "",
    redirectUri: "",
    clientRedirectUri: "" + "/dashboard/events?fbauth=true",
	scope: "business_management, manage_pages, pages_manage_cta, pages_show_list, user_events"
}

let fbDataParams = {
	user: {
		name: null,
		accessToken: null,
		id: null
	},
	page: {
		name: "",
		accessToken: null,
        id: null,
        params: "/events/?fields=id,name,owner,start_time,end_time,event_times,place,description,category,attending_count,maybe_count,interested_count,declined_count,noreply_count,cover,admins{name,username,profile_type,pic_large,pic_small,link,id},ticket_uri,ticket_uri_start_sales_time,ticketing_privacy_uri,ticketing_terms_uri,updated_time"
	}
}

let fbReqOptions = {
	timeout: 3000,
	pool: { maxSockets:  Infinity },
	headers: { connection:  "keep-alive" }
}
//-------------------------------------------------


const facebookApiAuth = (req, res) => {

	// we don't have a code yet
	// so we'll redirect to the oauth dialog
	if (!req.query.code) {
		
		const authUrl = graph.getOauthUrl({
			"client_id": facebookAuth.clientId,
			"redirect_uri": facebookAuth.redirectUri,
			"scope": facebookAuth.scope
		})
	
		if (!req.query.error) {
			res.redirect(authUrl);
		} else {
			return res.json({
                success: false,
                message: "Facebook api access denied."
            })
		}
	}

	else {
		// code is set
		// we'll send that and get the access token
		graph.authorize({
				"client_id": facebookAuth.clientId,
				"redirect_uri": facebookAuth.redirectUri,
				"client_secret":  facebookAuth.clientSecret,
				"code": req.query.code
		}, function (err, facebookRes) {
            if(err){
                return res.json({
                    success: false,
                    message: "Can't authorize Facebook api."
                })
            }
            getFbDataParams(facebookRes, fbDataParams, graph, fbReqOptions)
            .then((r) => {
                if(r.success == true){
                    res.redirect(301, facebookAuth.clientRedirectUri)
                }
            })
		})
	}
}



const saveFacebookEvents = (req, res) => {

    //getting facebook ids of existing events to filter response array
    let eventsFbIds = []
    Event.find({}, (err, events) => {
        if(err){
            throw new Error(`Can't get events data.`);
        }
    
        events.forEach((event, index) => {
            eventsFbIds[index] = event.fbId
        })
    })

    const getAllFBEvents = new Promise((resolve, reject) => {   
        let eventsArray = []
        graph.setOptions(fbReqOptions)
        .get("/" + fbDataParams.page.id + fbDataParams.page.params, (err, FBres) => {
            if(err){
                resolve({
                    success: false,
                    message: "Events not retrieved."
                })
            } else {
                FBres.data.forEach((event) => {
                    if(!eventsFbIds.includes(event.id)){
                        eventsArray.push(fbEventGet(event))
                    }
                })
                resolve({
                    success: true,
                    message: "Events retrieved.",
                    data: eventsArray
                })
            } 
        })
    })
    
    getAllFBEvents.then((r) => {
        if(r.success == true){
            Event.insertMany(r.data, (err, data) => {
                if(err){
                    res.send(err)
                }
                return res.json({
                    success: true,
                    message: "Facebook events saved to database.",
                    data: r.data
                })
            })
        } else {
            return res.json({
                success: false,
                message: r.message
            })
        }
    })
}

module.exports = {
    facebookApiAuth,
    saveFacebookEvents
}