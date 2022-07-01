import 'react-sortable-tree/style.css';
import { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SortableTree from 'react-sortable-tree';
import { FaEdit } from 'react-icons/fa';
import { actionCategoryUpsert } from '../../../actions/actionCategoryUpsert';
import { CategoryEditModal } from '../CategoryEditModal';
import { Box, Button } from '@mui/material';

const bulidCategoryTree = (list) => {
    let node,
        roots = [],
        map = {},
        newList = [];

    for (let i = 0; i < list.length; i += 1) {
        newList[i] = {};
        newList[i].children = [];
        newList[i].title = list[i].name;
        newList[i].parent = list[i].parent;
        newList[i]._id = list[i]._id;
        map[newList[i]._id] = i;
    }

    for (let i = 0; i < list.length; i += 1) {
        node = newList[i];
        if (list[i].subcategories) {
            for (let subCat of list[i].subcategories) {
                node.children.push(newList[map[subCat._id]]);
            }
        }
    }

    for (let i = 0; i < list.length; i += 1) {
        node = newList[i];
        if (node.parent === null) {
            roots.push(node);
        }
    }
    return roots;
};

const bulidCategoryList = (tree) => {
    let list = [];
    for (let node of tree) {
        list = [...list, node];
        if (!!node.children?.length) {
            list = [...list, ...bulidCategoryList(node.children)];
        }
    }
    return list;
};

export const AdminCategoryTree = ({ categories, onDrop, onPopupOpen }) => {
    const [treeData, setTreeData] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);

    useEffect(() => {
        setTreeData(bulidCategoryTree(categories));
    }, [categories]);

    return (
        <Box className="CategotyTree">
            <CategoryEditModal
                category={selectedNode}
                isOpen={isCategoryPopupOpen}
                onClose={() => setIsCategoryPopupOpen(false)}
            />
            <SortableTree
                isVirtualized={false}
                treeData={treeData}
                onChange={(treeData) => setTreeData(treeData)}
                generateNodeProps={({ node, parentNode }) => ({
                    onDrop: () => {
                        const { _id, title: name } = node;
                        if (parentNode) {
                            let { _id, title: name } = parentNode;
                            let subcategories =
                                parentNode?.children?.map(({ _id, title: name }) => ({ _id, name })) || [];
                            onDrop({ _id, name, subcategories });
                        } else {
                            onDrop({ _id, name, parent: null });
                        }
                    },
                    buttons: [
                        <Button
                            className="editButton"
                            onClick={() => {
                                let parent = null;
                                let { title: name, children: subcategories, _id } = { ...node };
                                subcategories = subcategories.map(({ _id, title: name }) => ({ _id, name }));
                                if (parentNode) {
                                    let { title: name, _id } = parentNode;
                                    parent = { _id, name };
                                }
                                setSelectedNode({ name, _id, subcategories, parent });
                                setIsCategoryPopupOpen(true);
                            }}
                        >
                            <FaEdit />
                        </Button>,
                    ],
                    className: 'TreeNode',
                })}
            />
        </Box>
    );
};

export const CAdminCategoryTree = connect((state) => ({ categories: state.promise?.catAll?.payload || [] }), {
    onDrop: (category) => actionCategoryUpsert(category),
})(AdminCategoryTree);
