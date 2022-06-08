import { Box, Table, TableBody } from '@mui/material';
import { OrderGood } from './OrderGood';
import Select from 'react-select';
import { useEffect, useState } from 'react';

export const OrderGoodsEditor = ({ orderGoods = [], onChange = null, goodList = [] } = {}) => {
    const handleChange = (goods) => {
        const deltaGoods = goods.filter(
            (good) =>
                !orderGoods.some((orderGood) => {
                    return good._id === orderGood.good._id;
                })
        );

        const deltaOrderGoods = orderGoods.filter(
            (orderGood) =>
                !goods.some((good) => {
                    return good._id === orderGood.good._id;
                })
        );

        for (const good of deltaGoods) {
            orderGoods.push({ count: 1, good: good });
        }
        for (const [key, value] of Object.entries(deltaOrderGoods)) {
            orderGoods = orderGoods.filter((orderGood) => {
                return orderGood.good._id !== value.good._id;
            });
        }

        onChange(orderGoods);
    };

    return (
        <Box classname="OrderGoodsEditor">
            <Select
                placeholder="Обрати товари"
                value={orderGoods.map((orderGood) => ({ value: orderGood.good._id, label: orderGood.good.name }))}
                closeMenuOnSelect={false}
                onChange={(e) => {
                    handleChange(e.map(({ label, value }) => ({ _id: value, name: label })));
                }}
                options={goodList?.map(({ _id, name }) => ({ value: _id, label: name }))}
                isMulti={true}
            />
            <Table>
                <TableBody>
                    {(orderGoods || []).map((orderGood, idx) => (
                        <OrderGood
                            key={orderGood.good._id}
                            orderGood={orderGood}
                            onChange={(newOrderGood) => {
                                if (+newOrderGood.count <= 0) {
                                    orderGoods = orderGoods.filter((item, index) => {
                                        return idx !== index;
                                    });
                                } else {
                                    orderGoods[idx] = orderGood;
                                }
                                onChange(orderGoods);
                            }}
                        />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};
