const iconFile = "pkg:/images/icons/ICON.png";
const size = process.size;

function buttons(){
    return ["search","home","menu","close"]
    .map((z,i)=>{ 
        return {
            type:"ContentNode", fields:{
                hdposterurl: iconFile.replace(/ICON/,z),
            },  events: {
                right:[
                    { type: 'set', id:"MoviePosterGrid", focus:true }
                ],
            }
        }
    });
}

module.exports = ()=>{
    const children = {
        focus: true,
        type:"PosterGrid", fields:{ id:"MenuGrid",
            translation:[ 0.02 * size.w, 0.30 * size.h ],
            itemSpacing:[ 0.01 * size.w, 0.01 * size.h ],
            numColumns:1,numRows: 6, basePosterSize:[60,60],
        },  children: [{
            type: "ContentNode", children: buttons(),
        }]
    }

    return {
        type:"Group", fields: {},
        children: [{
            type:"Rectangle", fields:{
                width: 60 + (0.03 * size.w),
                color:"0x000000",
                height: size.h,
            }
        },children]
    };
        
}