from rest_framework import serializers
from .models import Post, Category, Tag, Section


POST_PREVIEW_FIELDS = (
    "id",
    "title",
    "slug",
    "publish_date",
    "preview",
    "thumbnail",
    "banner",
    "tags",
)


POST_DETAIL_FIELDS = (
    "id",
    "title",
    "keywords",
    "slug",
    "updated",
    "publish_date",
    "banner",
    "post_category",
    "tags",
    "sections",
)


class SectionSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    def get_type(self, obj):
        return obj.get_type_display()

    class Meta:
        model = Section
        fields = (
            "id",
            "type",
            "image",
            "video",
            "media_left",
            "media_alt",
            "media_caption",
            "text",
        )


class PostListSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)

    class Meta:
        model = Post
        fields = POST_PREVIEW_FIELDS


class PostDetailSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    post_category = serializers.StringRelatedField()
    sections = SectionSerializer(many=True)

    class Meta:
        model = Post
        fields = POST_DETAIL_FIELDS


class PostEditorSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    post_category = serializers.StringRelatedField()
    sections = SectionSerializer(many=True)

    class Meta:
        model = Post
        fields = list(set(POST_PREVIEW_FIELDS) | set(POST_DETAIL_FIELDS))
