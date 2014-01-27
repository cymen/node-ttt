'use strict';

module.exports = {
    board: function(rows) {
        var lines = [],
            header = 0;

        for (var i = 0; i < rows.length; i++) {
            lines.push(this.header([++header, ++header, ++header]));
            lines.push(this.row(rows[i]));

            if (i !== rows.length - 1) {
                lines.push(this.divider());
            } else {
                lines.push(this.footer());
            }
        }

        return lines.join('\n');
    },

    divider: function() {
        return '_____|_____|_____';
    },

    footer: function() {
        return '     |     |     ';
    },

    header: function(labels) {
        return labels.join('    |');
    },

    row: function(row) {
        for (var i = 0; i < row.length; i++) {
            row[i] = row[i] || ' ';
        }

        return '  ' + row.join('  |  ') + '  ';
    }
};
