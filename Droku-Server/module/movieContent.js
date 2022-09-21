const size = process.size;

module.exports = ()=>{
    const children = { type:"ContentNode", children: new Array() };

    for( var i=10; i--; ){
        children.children.push({
            type:"ContentNode", fields: {  id:`${i}`,
                hdposterurl: "https://www.cinemascomics.com/wp-content/uploads/2022/03/Billy-Butcher-THE-BOYS-3.jpg"
            },events:{ 
                left: [{ type:'set', id:"MenuGrid", focus:true }],
                OK: [{ type:'set', id:"videoPlayer", focus:true, fields:{
                    control:"play", visible: true
                }}]
            },
        })
    }

    return {
        type:"PosterGrid", fields:{
            translation:[ 0.10 * size.w, 0.20 * size.h ],
            itemSpacing:[ 0.01 * size.w, 0.01 * size.h ],
            vertFocusAnimationStyle: 'fixedFocus',
            basePosterSize:[170,230],
            numColumns:6, numRows: 6,
            id:"MoviePosterGrid",
        }, children: [children],
    }
}