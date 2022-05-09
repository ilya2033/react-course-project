import { connect } from 'react-redux';
import { Categories } from '../../common/Categories';

const CCategories = connect((state) => ({
    categories: state.promise.rootCats?.payload || [],
}))(Categories);

export { CCategories };
