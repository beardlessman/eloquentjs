const MOUNTAINS = require('./mountains.js');

const rowHeights = (rows) => {
    return rows.map(row => {
        return row.reduce((max, cell) => Math.max(max, cell.minHeight()), 0);
    });
}

const colWidths = (rows) => {
    return rows[0].map((_, i) => { // _ означает что аргумент не используется
        return rows.reduce((max, row) => Math.max(max, row[i].minWidth()), 0);
    });
}

const drawTable = (rows) => {
    const heights = rowHeights(rows);
    const widths = colWidths(rows);

    drawLine = (blocks, lineNo) => blocks.map(block => block[lineNo]).join(' ');

    drawRow = (row, rowNum) => {
        let blocks = row.map((cell, colNum) => cell.draw(widths[colNum], heights[rowNum]));
        return blocks[0].map((_, lineNo) => drawLine(blocks, lineNo)).join('\n');
    }

    return rows.map(drawRow).join('\n');
}

const repeat = (string, times) => {
    let result = '';
    for (let i = 0; i < times; i++) {
        result += string;
    }
    return result;
}

class TextCell {
    constructor(text) {
        this.text = text.split('\n');
    }
    minWidth() {
        return this.text.reduce((width, line) => {
            return Math.max(width, line.length);
        }, 0);
    }
    minHeight() {
        return this.text.length;
    }
    draw(width, height) {
        let result = [];
        for (let i = 0; i < height; i++) {
            let line = this.text[i] || '';
            result.push(line + repeat(" ", width - line.length));
        }
    
        return result;
    }
}

class UnderlinedCell {
    constructor(inner) {
        this.inner = inner;
    }
    minWidth() { return this.inner.minWidth(); }
    minHeight() {return this.inner.minHeight() + 1; }
    draw(width, height) {return this.inner.draw(width, height - 1).concat([repeat('-', width)]); }
}

class RTextCell extends TextCell {
    constructor(text) {
        super(text);
    }
    draw(width, height) {
        let result = [];
        for (let i = 0; i < height; i++) {
            let line = this.text[i] || '';
            result.push(repeat(' ', width - line.length) + line);
        }
        return result;
    }
}

const dataTable = (data) => {
    const keys = Object.keys(data[0]);
    const headers = keys.map(name => new UnderlinedCell(new TextCell(name)));
    const body = data.map(row => {
        return keys.map(name => {
            const value = row[name];
            if (typeof value === 'number') {
                return new RTextCell(String(value));
            } else {
                return new TextCell(String(value));
            }
        });
    });
    return [headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));