INSERT INTO public.menu(
	id, name, path, parent_id, level, 
	created_date, created_by, update_date, 
	update_by, is_use, sort)
	VALUES 
('750d9a21-c15a-419d-8ce2-5a36acf55382', 'Dashboard', 'dashbord', null, '1', Now(),  'c0fd1c11-da3e-439d-b3c3-54b4a187628d',Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 1),

('eed80b0c-0f03-48c9-b61b-2f48e533e237', 'Production Planing', 'Production_Planing', null, '2', Now(),  'c0fd1c11-da3e-439d-b3c3-54b4a187628d',Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 2),
('a014b0a9-cd61-430d-b5f0-923e792b1c91', 'Upload Order Forecast', 'Upload_Order_Forecast', 'eed80b0c-0f03-48c9-b61b-2f48e533e237', '2', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 1),
('3bb46dad-8437-4071-9632-8fcb53828832', 'Approve Production Item', 'Approve_Production_Item', 'eed80b0c-0f03-48c9-b61b-2f48e533e237', '2', Now(),  'c0fd1c11-da3e-439d-b3c3-54b4a187628d',Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 2),

('e56e8bbc-fd79-45dd-b45b-6ce85fe879f3', 'Material Requirement Planning', 'Material_Requirement_Planning', null, '1', Now(),  'c0fd1c11-da3e-439d-b3c3-54b4a187628d',Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 3),
('b4b30410-b586-45e1-b363-dcd0b3a69133', 'Approve Material item', 'Approve_Material_item', 'e56e8bbc-fd79-45dd-b45b-6ce85fe879f3', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 1),
('a293a3d9-6e43-4e08-8758-b14a06e655c4', 'Approve Raw Material for PO', 'Approve_Raw_Material_for_PO', 'e56e8bbc-fd79-45dd-b45b-6ce85fe879f3', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 2),

('a29e8e4c-feee-43cd-a13e-fdfcfaf29363', 'Warehouse Management', 'Warehouse_Management', null, '1', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 4),
('82d320d0-24bf-46ff-a287-ca54c08f86f1', 'Raw Mat IN/OUT', 'Raw_Mat_In_Out', 'a29e8e4c-feee-43cd-a13e-fdfcfaf29363', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 1),
('20d42eea-6e19-4c38-b38c-c51634111f19', 'Cutting IN/OUT', 'CuttingInOut', 'a29e8e4c-feee-43cd-a13e-fdfcfaf29363', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 2),
('75c52f78-732e-4b08-8b93-b806ceb5cf5f', 'WIP IN/OUT', 'WIP_IN_OUT', 'a29e8e4c-feee-43cd-a13e-fdfcfaf29363', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 3),
('3b26829c-be9e-4a7b-aa66-e10e0da22a24', 'WIP IN/OUT', 'WIP_IN_OUT', 'a29e8e4c-feee-43cd-a13e-fdfcfaf29363', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 4),
('729e0094-5fff-4785-bc40-b57613e79004', 'F/G IN/OUT', 'F_G_In_Out', 'a29e8e4c-feee-43cd-a13e-fdfcfaf29363', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 5),
('fa8ff6fa-5d88-4236-9da2-1db2f558046e', 'Factory Master Data', 'Factory_Master_Data', 'a29e8e4c-feee-43cd-a13e-fdfcfaf29363', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 6),
('5f40b34a-08b8-40c4-9ca7-cc721fb634fe', 'Product', 'Product', 'fa8ff6fa-5d88-4236-9da2-1db2f558046e', '3', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 1),
('3b5a1126-96ad-4e8c-86db-20651f16e274', 'Raw Material', 'Raw_Materail', 'fa8ff6fa-5d88-4236-9da2-1db2f558046e', '3', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 2),
('97d055f4-c682-4001-be5f-e5d8718f003c', 'Product Grouping', 'Product_Grouping', 'fa8ff6fa-5d88-4236-9da2-1db2f558046e', '3', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 3),
('907dc20a-2df5-42cc-a5c1-7afa856ffff8', 'Supplier', 'Supplier', 'fa8ff6fa-5d88-4236-9da2-1db2f558046e', '3', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 4),
('5d543ba9-64db-4b4d-ad06-b27d26988c98', 'Production Line', 'Production_Line', 'fa8ff6fa-5d88-4236-9da2-1db2f558046e', '3', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 5),

('b5b35f08-2c97-4e78-bf8c-d13ef7a8317a', 'Statistic & History', 'Statistic_n_History', null, '1', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 5),
('0e677af7-90f5-4a4c-887c-8f063161168d', 'Delivery Record', 'Delivery_Record', 'b5b35f08-2c97-4e78-bf8c-d13ef7a8317a', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 1),
('9f33ef2c-8ceb-497c-ad55-ca71e00b2af5', 'Warehouse History', 'Warehouse_History', 'b5b35f08-2c97-4e78-bf8c-d13ef7a8317a', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 2),
('9a2a111e-b859-4dbf-a7c2-76f1b8525a98', 'Material Consumtion', 'Materail_Consumtion', 'b5b35f08-2c97-4e78-bf8c-d13ef7a8317a', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 3),
('3a103b4f-1b86-4bc0-aa1d-f521dd4cd450', 'PO History', 'POHistory', 'b5b35f08-2c97-4e78-bf8c-d13ef7a8317a', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 4),
('21c2ed24-a15a-45b5-9beb-7c12e52719fd', 'Tracking History', 'TrackingHistory', 'b5b35f08-2c97-4e78-bf8c-d13ef7a8317a', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d',Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 5),

('e4772ac8-d52a-4652-b16a-d527dd7f213f', 'Quanlity Control', 'Quanlity_Control',null, '1', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(),  'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, '6'),
('b1650076-cf10-4c94-a2db-4460ae9a51a3', 'Quanlity Control(Manual)', 'Manual', 'e4772ac8-d52a-4652-b16a-d527dd7f213f', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 1),
('c48e0f1e-6d76-4a0d-8bcb-767987cc9a71', 'Quanlity Inspection (AI)', 'AI', 'e4772ac8-d52a-4652-b16a-d527dd7f213f', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 2),
('0e70ccd2-7068-418f-9b37-7a734b45038f', 'Model Traning', 'Model_Traning', 'e4772ac8-d52a-4652-b16a-d527dd7f213f', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 3),
('3e22245b-1538-415b-883d-b347c1956f3f', 'Log Monitory', 'Log_Monitor', 'e4772ac8-d52a-4652-b16a-d527dd7f213f', '2', Now(),'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', true, 4);


INSERT INTO public.feature(
	id, name, menu_id, sort, create_date, create_by, update_by, update_date, is_use)
	VALUES ('49d616d8-3f78-4965-b7ab-356918403747', 'Tap1', '5f40b34a-08b8-40c4-9ca7-cc721fb634fe', '1', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(),  true),
    ('d06ea171-0b38-42a8-9634-a8c00189e039', 'Tap2', '5f40b34a-08b8-40c4-9ca7-cc721fb634fe', '2', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(),  true),
    ('3de237cf-81b8-46e4-bdc3-5a6c575e9e3c', 'Tap3', '5f40b34a-08b8-40c4-9ca7-cc721fb634fe', '3', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(),  true),
    ('b4f62a34-86f7-4abb-a4d5-c419c0fb6d82', 'Tap4', '5f40b34a-08b8-40c4-9ca7-cc721fb634fe', '4', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(),  true);

INSERT INTO public.feature(
	id, name, menu_id, sort, create_date, create_by, update_by, update_date, is_use)
	VALUES ('', '', '', '1', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(),  true),
   ('', '', '', '1', Now(), 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', 'c0fd1c11-da3e-439d-b3c3-54b4a187628d', Now(),  true);

INSERT INTO public.permission(
	id, user_id, is_use, feature_id)
	VALUES  ('dfe9c30d-e927-4042-a81e-fb0dba5062cb', '716997e6-cd3f-42de-b223-b4d25c26c882', true, '49d616d8-3f78-4965-b7ab-356918403747'),
	('ba1f4f14-1180-4689-8e42-e220e112915c', '716997e6-cd3f-42de-b223-b4d25c26c882', true, 'd06ea171-0b38-42a8-9634-a8c00189e039');





