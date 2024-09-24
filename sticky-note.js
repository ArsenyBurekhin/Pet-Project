import {getTheElementColor} from './common.js';
import{fetchElementImage} from './common.js';
// Initialize the stage
const stage = new Konva.Stage({
    container: 'container',
    width: 1200,
    height: 800
});
// Create a layer
const layer = new Konva.Layer();
stage.add(layer);
// Function to create a new sticky not
function createStickyNote(element) {
    const color = getTheElementColor(element);
    const x = Math.random() * (stage.width() - 200);
    const y = Math.random() * (stage.height() - 200);
    const group = new Konva.Group({
        x: x,
        y: y,
        draggable: true
    });
    const stickyNote = new Konva.Rect({
        width: 200,
        height: 200,
        fill: color,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
        cornerRadius: 10,
    });
    const elementNumber = new Konva.Text({
        x: 10,
        y: 10,
        text: element.periodicNumber,
        fontSize: 20,
        fontFamily: 'Arial',
        fill: '#2d3436',
        width: 100,
        align: 'left',
    });
    const elementSymbol = new Konva.Text({
        x: 10,
        y: 60,
        text: element.symbol,
        fontSize: 55,
        fontStyle: 'bold',
        fontFamily: 'Arial',
        fill: '#2d3436',
        width: 160,
        align: 'center',
    });
    const elementName = new Konva.Text({
        x: 10,
        y: 120,
        text: element.name,
        fontSize: 25,
        fontFamily: 'Arial',
        fill: '#2d3436',
        width: 180,
        align: 'left',
    });
    const elementWeigth = new Konva.Text({
        x: 10,
        y: 160,
        text: element.atomicWeight,
        fontSize: 20,
        fontFamily: 'Arial',
        fill: '#2d3436',
        width: 180,
        align: 'left',
    });
    const imageObj = new Image();
    imageObj.onload = function() {
      const konvaImage = new Konva.Image({
        x: 150,
        y: 150,
        image: imageObj,
        width: 50,
        height: 50
      });
    // Clip the image with a circle
   /*  layer.clipFunc((ctx) => {
     ctx.beginPath();
     ctx.arc(50, 50, 50, 0, Math.PI * 2, false);
     ctx.closePath();
    });*/
      group.add(konvaImage);
      layer.draw();
    };
    imageObj.src =  fetchElementImage(element.name);//.elementName;
    group.add(stickyNote);
    group.add(elementNumber);
    group.add(elementSymbol);
    group.add(elementName);
    group.add(elementWeigth);


 var i = 10;
    element.energyLevels.forEach((level) => {
        console.log(level);
        var textLevel = new Konva.Text({
            x: 160,
            y: i,
            text: level,
            fontSize: 15,
            fontFamily: 'Arial',
            fill: '#2d3436',
            width: 35,
            align: 'right',
        });
        i +=16;
        group.add(textLevel);
    });


    // Add hover effect
    group.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
        stickyNote.shadowBlur(15);
        layer.draw();
    });

    group.on('mouseout', function () {
        document.body.style.cursor = 'default';
        stickyNote.shadowBlur(10);
        layer.draw();
    });

    // Add drag and drop functionality
    group.on('dragstart', function () {
        this.moveToTop();
        stickyNote.shadowBlur(20);
        layer.draw();
    });

    group.on('dragend', function () {
        stickyNote.shadowBlur(10);
        layer.draw();
    });

    layer.add(group);
    layer.draw();
}
function searchElementByNumber(data, elementNumber) {
    return data.elements.find(el => el.periodicNumber == elementNumber);
}
function hideDiv(div) {
    div.style.display = 'none';
}
function showDiv(div) {
    console.log('none');
    div.style.display = 'block';
}
// Event listener for form submission
document.getElementById('sticky-form').addEventListener('submit', function (e) {

    e.preventDefault();
    hideDiv(document.getElementById('periodic-table-container'));
    showDiv(document.getElementById('container'));

    const number = document.getElementById('sticky-number').value;
    console.log("we got number ")
    if (elementsData != null) {
        console.log("we got elementsData")
    }
    const element = searchElementByNumber(elementsData, number);
    if (element != null) {
        console.log("we found the element")
    }

    createStickyNote(element);
    this.reset(); // Reset the form after submission
});