<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Testing</title>

        <style type="text/css">
            .modal {
                display: none;
                z-index: 2;
                position: absolute;
            }

            .modal-background {
                position: fixed;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, .5);
                z-index: 1;
            }
        </style>
	</head>
	<body>
        <div>Bladiebla</div>
		<input type="text" name="test" value="" id="input" data-component="input" data-match="^[a-zA-Z0-9]+$" />
        <button id="bla"
                data-calls-component
                data-target="reportReaction"
                data-options="{'background': true}"
                data-modal-replace="{'id': {{$reaction->id()}}}"><i
                    class="icon-warning"></i></button>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
        <textarea data-directive="SimpleEditor" id="gf"></textarea>

        <div class="modal" id="reportReaction" data-component="modal">
            <div class="content-box">
                <header class="title deepOrange">{{trans('news.reactions.report_reaction_header')}}
                    <i class="push-right close icon-close-small" data-close>x</i>
                </header>
                <div class="content">
                    <button data-calls-component
                            data-target="deleteReaction"
                            data-options="{'background': true}"
                            data-modal-replace="{'id': {{$reaction->id()}}}"><i
                                class="icon-bin"></i></button>
                </div>
            </div>
        </div>
        <div class="modal" id="deleteReaction" data-component="modal">
            <div class="content-box">
                <header class="title red">{{trans('news.reactions.delete_reaction_header')}}
                    <i class="push-right close icon-close-small" data-close>close</i>
                </header>
                <div class="content">
                    <form method="POST" action="/community/news/reaction/{id}/delete">
                        {!! csrf_field() !!}
                        {{trans('news.reactions.delete_reaction_text')}}
                        <div class="devider"></div>
                        <div class="form-button-link push-right">
                            <a data-close class="link">{{trans('news.reactions.delete_reaction_cancel')}}</a>
                            <button type="submit"
                                    class="button button-red">{{trans('news.reactions.delete_reaction_sure')}}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    <script src="https://cdn.ckeditor.com/4.9.0/standard/ckeditor.js" type="text/javascript"></script>
	<script src="./build/bundle.js"></script>

	<script>
        new Components(document);
	</script>
	</body>
</html>
