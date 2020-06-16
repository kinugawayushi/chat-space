# データベース設計

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


## users テーブル
|Column|Type|Option|
|------|----|------|
|username|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association 
- has_many :groups_users
- has_many :groups, through: :groups_users


## groups テーブル
|Column|Type|0ption|
|------|----|------|
|groupname|string|null: false|
|user-id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, add_index :groups,  :groupname|

### Association
- has-many :groups_users
- has-many :users, through: :groups_users
- has-many :messages




## messagesテーブル
|Column|Type|0ption|
|------|----|------|
|body|text|null: false|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user-id|integer|null: false, foreign_key: true|

### Association
- belongs_to : user
- belongs_to :groups

