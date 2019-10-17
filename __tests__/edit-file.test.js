'use strict';

const fileReader = require('../lib/edit-file');

jest.mock('fs')

describe('Testing File Reader Module', () => {
    it('when given a bad file, returns an error', (done) => {
        let file = `${__dirname}../data/bad.txt`;
        fileReader(file, (err, data) => {
            expect(err).toBeDefined()
            expect(data).not.toBeDefined();
            expect(err).toBeEqaul('Invalid File Input')
            done();
        });
    });
});