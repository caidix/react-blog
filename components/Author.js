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
        <a href="https://github.com/caidix/" target="_blank"><Avatar size={28} icon="github" className="account" /></a>
        <Avatar title="380141132" size={28} icon="qq" className="account" />
        <Avatar size={28} title="后端由MongoDB+Nodejs支持" icon="database" className="account" />

      </div>
    </div>
  )

}

export default Author
