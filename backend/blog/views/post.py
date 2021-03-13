from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, filters, pagination
from ..serializers import PostListSerializer, PostDetailSerializer, PostEditorSerializer
from ..models import Post, Category, Tag, Section
from ..filters import CanReadPost, IsAuthor

# Create your views here.


class BlogModelViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if hasattr(self, "action_serializers"):
            return self.action_serializers.get(self.action, self.serializer_class)
        return super(BlogModelViewSet, self).get_serializer_class()


class PostView(BlogModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    action_serializers = {"retrieve": PostDetailSerializer, "list": PostListSerializer}
    pagination_class = pagination.PageNumberPagination
    filter_backends = [CanReadPost, filters.SearchFilter]
    search_fields = ["title", "=tags__name"]
    lookup_field = "slug"


class PostEditView(BlogModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    action_serializers = {"retrieve": PostDetailSerializer, "list": PostListSerializer}
    pagination_class = pagination.PageNumberPagination
    filter_backends = []
    lookup_field = "slug"
