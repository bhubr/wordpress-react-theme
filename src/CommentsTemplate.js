import React from 'react';
import { Link } from 'react-router-dom';

class CommentsTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.moveForm = this.moveForm.bind(this);
  }
  moveForm() {
    // "return addComment.moveForm( &quot;div-comment-1&quot;, &quot;1&quot;, &quot;respond&quot;, &quot;253&quot; )"
  }
  render() {
    const { depth, parent, post } = this.props;
    const comments = this.props.comments.filter(c => (c.parent == parent));
    console.log('CommentsTemplate', parent, depth, comments);
    return (
      <ol>
      {comments.map(comment => <li key={comment.id} className={"comment byuser comment-author-johndifool even thread-even depth-" + (depth + 1) + " parent"} id="comment-1">
				<div id="div-comment-1" className="comment-body">
  				<div className="comment-author vcard">
  			   <img alt="" src="http://1.gravatar.com/avatar/ad92ee570800e427e8fd4b099fa29611?s=74&amp;d=mm&amp;r=g" srcSet="http://1.gravatar.com/avatar/ad92ee570800e427e8fd4b099fa29611?s=148&amp;d=mm&amp;r=g 2x" className="avatar avatar-74 photo" height="74" width="74" />
           <cite className="fn">johndifool</cite>
           <span className="says">dit&nbsp;:</span>
         </div>

      		<div className="comment-meta commentmetadata">
            <Link to="/2018/01/post-slug/#comment-1">9 janvier 2018 à 18 h 39 min</Link>
          </div>

      		<p>{ comment.content }</p>

      		<div className="reply">
            <Link rel="nofollow"
            className="comment-reply-link"
            to="/2018/01/pour-vous-parier-il-se-revoltait-contre/?replytocom=1#respond"
            onClick={this.moveForm}
            aria-label="Répondre à johndifool">
              Répondre
            </Link>
          </div>
				</div>
    		<CommentsTemplate comments={this.props.comments} parent={comment.id} depth={depth + 1} />
      </li>)}
      </ol>
    );
  }
}

export default CommentsTemplate;
