/*
 * @Description:
 * @Version: 1.0
 * @Author: OriX
 * @Date: 2021-05-05 21:01:35
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-14 14:44:09
 */
import request from '@/utils/request';
// 获取商品列表
export async function getGoodsList(params) {
  return request.get('/api/admin/goods', { params });
}
// 上架和下架
export async function changeGoodsOn(goodId) {
  return request.patch(`/api/admin/goods/${goodId}/on`);
}
// 推荐于未推荐
export async function changeGoodsRecommend(goodId) {
  return request.patch(`/api/admin/goods/${goodId}/recommend`);
}
// 获取单个商品的详情
export async function getGoodsInfo(goodId) {
  return request.get(`/api/admin/goods/${goodId}?include=category`);
}
// 修改单个商品的详情
export async function updateGoods(goodId, data) {
  return request.put(`/api/admin/goods/${goodId}`, { data });
}
// 增加单个商品
export async function addGoods(data) {
  return request.post(`/api/admin/goods/`, { data });
}
