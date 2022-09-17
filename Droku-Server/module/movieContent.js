const size = process.size;

module.exports = ()=>{
    const children = { type:"ContentNode", children: new Array() };

    for( var i=10; i--; ){
        children.children.push({
            type:"ContentNode", fields: { events:{
                left: [{set:{ id:"MenuGrid", focus:true, fields:{}}}],
                down: [{add:{ id:"MoviePosterGrid", url:"pageURL"}}],
                OK: [{video:"videoURL"}],
                }, hdposterurl: "https://www.cinemascomics.com/wp-content/uploads/2022/03/Billy-Butcher-THE-BOYS-3.jpg"
            }
        })
    }

    return {
        focus: true,
        type:"PosterGrid", fields:{
            vertFocusAnimationStyle: 'fixedFocus',
            basePosterSize:[170,230],
            id:"MoviePosterGrid",
            translation:[
                0.10 * size.w,
                0.20 * size.h
            ],itemSpacing:[
                0.01 * size.w,
                0.01 * size.h
            ],numColumns:6,numRows: 6,
        }, children: [children],
    }
}