process.size = { w:1280, h:720 };

const sidebar = require('./sideBar');
const overhang = require('./overHang');
const videoPlayer = require('./videoPlayer');
const movieContent = require('./movieContent');

//-----------------------------------------------------------------------------------------------------------//

function loadSceneChildren(){
    const output = new Array();

    output.push(videoPlayer());

    output.push(sidebar());
    output.push(overhang());
    output.push(movieContent());

    return output.reverse();
}

//-----------------------------------------------------------------------------------------------------------//

module.exports = ()=>{
    return { scene: {}, children:[{
        type:"Group", fields:{
            id: "mainScene"
        }, children: loadSceneChildren()
    }]};
}