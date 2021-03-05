from rest_framework import serializers
from .models import (
    Post, Category, Tag, 
    Section,
)

class SectionSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    def get_type(self,obj):
        return obj.get_type_display()
    class Meta:
        model = Section
        fields = ('id', 'order', 'type', 'image', 'video', 'text')

class PostListSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'publish_date', 'preview', 'thumbnail', 'banner', 'tags')

class PostDetailSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    post_category = serializers.StringRelatedField()
    sections = SectionSerializer(many=True)
    class Meta:
        model = Post
        fields = ('id', 'title', 'keywords', 'slug', 'updated', 'publish_date', 'banner', 'post_category', 'tags', 'sections')

class PostFullSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    post_category = serializers.StringRelatedField()
    sections = SectionSerializer(many=True)
    class Meta:
        model = Post
        fields = ('id', 'title', 'keywords', 'slug', 'updated', 'publish_date', 'preview', 'thumbnail', 'banner', 'post_category', 'tags', 'sections')
