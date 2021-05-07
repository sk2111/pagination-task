//cretae HTML Node of specific tag ,content, with give attributes
export const createDOMNode = (tagName, content = '', attribute = []) => {
    const elem = document.createElement(tagName);
    elem.innerText = content;
    if (Array.isArray(attribute) && attribute.length) {
        attribute.forEach(({ name, value }) => {
            elem.setAttribute(name, value);
        });
    }
    return elem;
};

// create Table Header Node
export const getTableHeaderNode = (headerTitleList = []) => {
    const tableRow = createDOMNode('tr');
    headerTitleList.forEach(title => tableRow.append(createDOMNode('th', title)));
    return tableRow;
};

// generate button Node dynamically based on fetch data length 
// used to paginates between data
export const getPaginationButtonsNodeList = (dataLength, rowLimit) => {
    const totalButtonCount = Math.ceil(dataLength / rowLimit);
    const buttonNodeList = [];
    const shortCutButtons = [
        { label: 'First', value: 1 },
        { label: 'Last', value: totalButtonCount },
        { label: 'Prev', value: 'prev' }];

    for (let i = 1; i <= totalButtonCount; i++) {
        const buttonAttributeList = [
            { name: 'onclick', value: 'buttonClick(this)' },
            { name: 'data-page', value: i }
        ];
        buttonNodeList.push(createDOMNode('button', i, buttonAttributeList));
    }
    shortCutButtons.forEach(({ label, value }) => {
        const buttonAttributeList = [
            { name: 'onclick', value: 'buttonClick(this)' },
            { name: 'data-page', value: value }
        ];
        buttonNodeList.push(createDOMNode('button', label, buttonAttributeList));
    });
    return buttonNodeList;
};

const tableHeader = getTableHeaderNode(['ID', 'Name', 'Email']);

// render user row data to table in DOM
export const renderTableDataNodeList = (currentPage, userData, rowLimit, tableNode) => {
    const startIndex = (currentPage - 1) * rowLimit;
    const pageData = userData.slice(startIndex, startIndex + rowLimit);
    const dataNodeList = pageData.map(({ id, name, email }) => {
        const tableRow = createDOMNode('tr');
        tableRow.append(createDOMNode('td', id));
        tableRow.append(createDOMNode('td', name));
        tableRow.append(createDOMNode('td', email));
        return tableRow;
    });

    tableNode.innerHTML = '';
    tableNode.append(tableHeader, ...dataNodeList);
};