import { Avatar, Divider } from 'antd'
import '../static/style/components/Author.less'

const Author = () => {

  return (
    <div className="author-div comm-box">
      <div> <Avatar size={100} src="img/avator.jpg" /></div>
      <div className="author-introduction">
        <Divider>CD</Divider>
        一枚在前端路上爬行的搬砖青年
                <Divider>社交账号</Divider>
        <Avatar size={28} icon="github" className="account" />
        <Avatar size={28} icon="qq" className="account" />
        <Avatar size={28} icon="wechat" className="account" />

      </div>
    </div>
  )

}

export default Author
