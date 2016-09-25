import {expect} from '../test_helper';
//types
import {GET_PRODUCTS} from '../../src/actions/types';
//actions
import {getProducts} from '../../src/actions/index';

describe('Actions', () => {
    describe('Getting products from Amazon', () => {
        let action;
        beforeEach(() => {
            action = getProducts({
                "keyword": "banana boat sunscreen",
                "category": "HealthPersonalCare"
            })
        })

        it('should have the correct type', () => {
            expect(action.type).to.equal(GET_PRODUCTS);
        })

        it('should return a json blob of products', (done) => {
            action.payload
                .then((res) => {
                    expect(res.data[1]).to.exist;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                })
        })
    })
})