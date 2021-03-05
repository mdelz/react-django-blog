from django.shortcuts import render
from rest_framework import viewsets
from .serializers import (
    PostListSerializer,
    PostDetailSerializer,
)
from .models import (
    Post, Category, Tag, 
    Section,
)

# Create your views here.

class BlogModelViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if hasattr(self, 'action_serializers'):
            return self.action_serializers.get(self.action, self.serializer_class)
        return super(BlogModelViewSet, self).get_serializer_class()


class PostView(BlogModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer

    action_serializers = {
        'retrieve': PostDetailSerializer,
        'list': PostListSerializer,
    }
