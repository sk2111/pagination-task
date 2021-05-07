import { createDOMNode, getPaginationButtonsNodeList, renderTableDataNodeList } from './helpers.js';

const RESOURCE_URL = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';
const TABLE_ROW_LIMIT = 10;
let userData = [];
let currentPage = 1;

//create title,tabel,button containers
const titleNode = createDOMNode('h1', 'DOM Pagination', [{ name: 'class', value: 'title' }]);
const tableNode = createDOMNode('table', '', []);
const buttonContainerNode = createDOMNode('div', '', [{ name: 'class', value: 'button-container' }]);
//Append to the body of html
document.body.append(titleNode, tableNode, buttonContainerNode,);


//Fetch user data from URL
fetch(RESOURCE_URL)
    .then(response => response.json())
    .then(data => {
        if (data.length) {
            userData = data;
            const buttonDOMList = getPaginationButtonsNodeList(userData.length, TABLE_ROW_LIMIT);
            renderTableDataNodeList(currentPage, userData, TABLE_ROW_LIMIT, tableNode);
            buttonContainerNode.append(...buttonDOMList);
        }
    });

// Button click handler attaching to window because of javascript module scope it wont be visible if
// declared with variable
window.buttonClick = (event) => {
    const pageIndex = event.getAttribute('data-page');
    if (Number(pageIndex) !== currentPage && userData.length) {
        currentPage = pageIndex === 'prev' ? currentPage - 1 : Number(pageIndex);
        if (currentPage > 0) {
            renderTableDataNodeList(currentPage, userData, TABLE_ROW_LIMIT, tableNode);
        }
    }
};




