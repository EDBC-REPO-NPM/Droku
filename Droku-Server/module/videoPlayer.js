content = {
    type: "ContentNode", fields: {
        title:"Test Video", streamformat:"mp4",
        url:"http://192.168.101.8:3000/video",
    }               
}

module.exports = ()=>{
    return {
        type:"Video",fields: {
            id: "videoPlayer",
            visible:false,
        }, events: {
            back: [
                { type:"set", id:"MoviePosterGrid", focus:true },
                { type:"set", id:"videoPlayer", fields:{
                    visible: false, control: "stop"
                }}
            ]
        }, children: [content]
    }
}