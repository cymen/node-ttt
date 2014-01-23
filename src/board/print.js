'use strict';

module.exports = {
    header: function(labels) {
        console.log(labels.join('    |'));
    },

    divider: function() {
        console.log('_____|_____|_____');
    },

    footer: function() {
        console.log('     |     |     ');
    },

    row: function(row) {
        for (var i = 0; i < row.length; i++) {
            row[i] = row[i] || ' ';
        }

        console.log('  ' + row.join('  |  ') + '  ');
    },

    rows: function(rows) {
        var header = 0;
        for (var i = 0; i < rows.length; i++) {
            this.header([++header, ++header, ++header]);
            this.row(rows[i]);

            if (i !== rows.length - 1) {
                this.divider();
            } else {
                this.footer();
            }
        }
    }
};
