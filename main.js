const RawDeflate = {};
!function(){var $,n,f,l,_,e,r,t,o,i,u,c,a,d,x,s,h,v,w,m,b,g,y,p,k,E,L,z,A,D,F,T,U,V,j,q,B,C,G,H,I,J,K,M,N,O,P,Q,R,S,W,X,Y,Z,$$,$n,$f=32767,$l=32506,$_=573,$e=parseInt(5.666666666666667,10),$r=null;function $t(){this.fc=0,this.dl=0}function $o(){this.dyn_tree=null,this.static_tree=null,this.extra_bits=null,this.extra_base=0,this.elems=0,this.max_length=0,this.max_code=0}function $i($,n,f,l){this.good_length=$,this.max_lazy=n,this.nice_length=f,this.max_chain=l}function $u(){this.next=null,this.len=0,this.ptr=[],this.off=0}var $0=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],$c=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],$1=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],$a=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],$4=[new $i(0,0,0,0),new $i(4,4,8,4),new $i(4,5,16,8),new $i(4,6,32,32),new $i(4,4,16,16),new $i(8,16,32,32),new $i(8,16,128,128),new $i(8,32,128,256),new $i(32,128,258,1024),new $i(32,258,258,4096)];function $6(){$=n=f=null,$r=null,t=null,o=null,i=null,u=null,D=null,F=null,T=null,U=null,V=null,j=null,q=null,B=null,C=null,G=null,J=null,K=null,M=null,N=null,O=null,P=null}function $d(n){n.next=$,$=n}function $x($){return u[32768+$]}function $5($,n){return u[32768+$]=n}function $s(l){$r[e+_++]=l,e+_===8192&&function l(){var r,t,o;if(0!==_){for(r=(null!==$?(o=$,$=$.next):o=new $u,o.next=null,o.len=o.off=0,o),null===n?n=f=r:f=f.next=r,r.len=_-e,t=0;t<r.len;t++)r.ptr[t]=$r[e+t];_=e=0}}()}function $3($){$&=65535,e+_<8190?($r[e+_++]=255&$,$r[e+_++]=$>>>8):($s(255&$),$s($>>>8))}function $8(){s=$x(x=(x<<$e^255&t[b+3-1])&$f),u[32767&b]=s,$5(x,b)}function $h($,n){$T(n[$].fc,n[$].dl)}function $v($){return($<256?M[$]:M[256+($>>7)])&255}function $2($,n,f){return $[n].fc<$[f].fc||$[n].fc===$[f].fc&&J[n]<=J[f]}function $w($,n,f){var l;for(l=0;l<f&&$n<$$.length;l++)$[n+l]=255&$$[$n++];return l}function $m($){var n,f,l,_,e=k,r=b,o=m,i=b>$l?b-$l:0,c=b+258,a=t[r+o-1],d=t[r+o];m>=z&&(e>>=2);do{if(t[(n=$)+o]!==d||t[n+o-1]!==a||t[n]!==t[r]||t[++n]!==t[r+1])continue;for(r+=2,n++;r<c;){for(l=0,_=!1;l<8;l+=1)if(n+=1,t[r+=1]!==t[n]){_=!0;break}if(_)break}if(f=258-(c-r),r=c-258,f>o){if(g=$,o=f,f>=A)break;a=t[r+o-1],d=t[r+o]}}while(($=u[32767&$])>i&&0!=--e);return o}function $7(){var $,n,f=65536-p-b;if(-1===f)f--;else if(b>=32768+$l){for($=0;$<32768;$++)t[$]=t[$+32768];for(g-=32768,b-=32768,d-=32768,$=0;$<32768;$++)n=$x($),$5($,n>=32768?n-32768:0);for($=0;$<32768;$++)n=u[$],u[$]=n>=32768?n-32768:0;f+=32768}y||(($=$w(t,b+p,f))<=0?y=!0:p+=$)}function $b($,f,o){var i;return l||(!y&&(c=0,a=0,function $(){var n,f,l,_,e;if(0===U[0].dl){for(_=0,j.dyn_tree=D,j.static_tree=T,j.extra_bits=$0,j.extra_base=257,j.elems=286,j.max_length=15,j.max_code=0,q.dyn_tree=F,q.static_tree=U,q.extra_bits=$c,q.extra_base=0,q.elems=30,q.max_length=15,q.max_code=0,B.dyn_tree=V,B.static_tree=null,B.extra_bits=$1,B.extra_base=0,B.elems=19,B.max_length=7,B.max_code=0,l=0;_<28;_++)for(n=0,N[_]=l;n<1<<$0[_];n++)K[l++]=_;for(K[l-1]=_,e=0,_=0;_<16;_++)for(n=0,O[_]=e;n<1<<$c[_];n++)M[e++]=_;for(e>>=7;_<30;_++)for(n=0,O[_]=e<<7;n<1<<$c[_]-7;n++)M[256+e++]=_;for(f=0;f<=15;f++)C[f]=0;for(n=0;n<=143;)T[n++].dl=8,C[8]++;for(;n<=255;)T[n++].dl=9,C[9]++;for(;n<=279;)T[n++].dl=7,C[7]++;for(;n<=287;)T[n++].dl=8,C[8]++;for($k(T,287),n=0;n<30;n++)U[n].dl=5,U[n].fc=$U(n,5);$y()}}(),function $(){var n;for(n=0;n<32768;n++)u[32768+n]=0;if(E=$4[L].max_lazy,z=$4[L].good_length,A=$4[L].nice_length,k=$4[L].max_chain,b=0,d=0,(p=$w(t,0,65536))<=0){y=!0,p=0;return}for(y=!1;p<262&&!y;)$7();for(n=0,x=0;n<2;n++)x=(x<<$e^255&t[n])&$f}(),n=null,_=0,e=0,L<=3?(m=2,w=0):(w=2,v=!1),r=!1),l=!0,0!==p)?(i=$g($,f,o))===o?o:r?i:(L<=3?function $(){for(;0!==p&&null===n;){var f;if($8(),0!==s&&b-s<=$l&&(w=$m(s))>p&&(w=p),w>=3){if(f=$D(b-g,w-3),p-=w,w<=E){w--;do b++,$8();while(0!=--w);b++}else b+=w,w=0,x=((x=255&t[b])<<$e^255&t[b+1])&$f}else f=$D(0,255&t[b]),p--,b++;for(f&&($A(0),d=b);p<262&&!y;)$7()}}():function $(){for(;0!==p&&null===n;){if($8(),m=w,h=g,w=2,0!==s&&m<E&&b-s<=$l&&((w=$m(s))>p&&(w=p),3===w&&b-g>4096&&w--),m>=3&&w<=m){var f;f=$D(b-1-h,m-3),p-=m-1,m-=2;do b++,$8();while(0!=--m);v=!1,w=2,b++,f&&($A(0),d=b)}else v?($D(0,255&t[b-1])&&($A(0),d=b),b++,p--):(v=!0,b++,p--);for(;p<262&&!y;)$7()}}(),0===p&&(v&&$D(0,255&t[b-1]),$A(1),r=!0),i+$g($,i+f,o-i)):(r=!0,0)}function $g($,f,l){var r,t,o,i;for(r=0;null!==n&&r<l;){for((t=l-r)>n.len&&(t=n.len),o=0;o<t;o++)$[f+r+o]=n.ptr[n.off+o];n.off+=t,n.len-=t,r+=t,0===n.len&&(i=n,n=n.next,$d(i))}if(r===l)return r;if(e<_){for((t=l-r)>_-e&&(t=_-e),o=0;o<t;o++)$[f+r+o]=$r[e+o];e+=t,r+=t,_===e&&(_=e=0)}return r}function $y(){var $;for($=0;$<286;$++)D[$].fc=0;for($=0;$<30;$++)F[$].fc=0;for($=0;$<19;$++)V[$].fc=0;D[256].fc=1,Y=Z=0,Q=R=S=0,W=0,X=1}function $p($,n){for(var f=G[n],l=n<<1;l<=H&&(l<H&&$2($,G[l+1],G[l])&&l++,!$2($,f,G[l]));)G[n]=G[l],n=l,l<<=1;G[n]=f}function $k($,n){var f,l,_=[],e=0;for(f=1;f<=15;f++)e=e+C[f-1]<<1,_[f]=e;for(l=0;l<=n;l++){var r=$[l].dl;0!==r&&($[l].fc=$U(_[r]++,r))}}function $E($){var n,f,l=$.dyn_tree,_=$.static_tree,e=$.elems,r=-1,t=e;for(n=0,H=0,I=$_;n<e;n++)0!==l[n].fc?(G[++H]=r=n,J[n]=0):l[n].dl=0;for(;H<2;){var o=G[++H]=r<2?++r:0;l[o].fc=1,J[o]=0,Y--,null!==_&&(Z-=_[o].dl)}for($.max_code=r,n=H>>1;n>=1;n--)$p(l,n);do n=G[1],G[1]=G[H--],$p(l,1),f=G[1],G[--I]=n,G[--I]=f,l[t].fc=l[n].fc+l[f].fc,J[n]>J[f]+1?J[t]=J[n]:J[t]=J[f]+1,l[n].dl=l[f].dl=t,G[1]=t++,$p(l,1);while(H>=2);G[--I]=G[1],function $(n){var f,l,_,e,r,t,o=n.dyn_tree,i=n.extra_bits,u=n.extra_base,c=n.max_code,a=n.max_length,d=n.static_tree,x=0;for(e=0;e<=15;e++)C[e]=0;for(o[G[I]].dl=0,f=I+1;f<$_;f++)(e=o[o[l=G[f]].dl].dl+1)>a&&(e=a,x++),o[l].dl=e,!(l>c)&&(C[e]++,r=0,l>=u&&(r=i[l-u]),Y+=(t=o[l].fc)*(e+r),null!==d&&(Z+=t*(d[l].dl+r)));if(0!==x){do{for(e=a-1;0===C[e];)e--;C[e]--,C[e+1]+=2,C[a]--,x-=2}while(x>0);for(e=a;0!==e;e--)for(l=C[e];0!==l;)!((_=G[--f])>c)&&(o[_].dl!==e&&(Y+=(e-o[_].dl)*o[_].fc,o[_].fc=e),l--)}}($),$k(l,r)}function $L($,n){var f,l,_=-1,e=$[0].dl,r=0,t=7,o=4;for(0===e&&(t=138,o=3),$[n+1].dl=65535,f=0;f<=n;f++)l=e,e=$[f+1].dl,(!(++r<t)||l!==e)&&(r<o?V[l].fc+=r:0!==l?(l!==_&&V[l].fc++,V[16].fc++):r<=10?V[17].fc++:V[18].fc++,r=0,_=l,0===e?(t=138,o=3):l===e?(t=6,o=3):(t=7,o=4))}function $z($,n){var f,l,_=-1,e=$[0].dl,r=0,t=7,o=4;for(0===e&&(t=138,o=3),f=0;f<=n;f++)if(l=e,e=$[f+1].dl,!(++r<t)||l!==e){if(r<o)do $h(l,V);while(0!=--r);else 0!==l?(l!==_&&($h(l,V),r--),$h(16,V),$T(r-3,2)):r<=10?($h(17,V),$T(r-3,3)):($h(18,V),$T(r-11,7));r=0,_=l,0===e?(t=138,o=3):l===e?(t=6,o=3):(t=7,o=4)}}function $A($){var n,f,l,_,e;if(_=b-d,P[S]=W,$E(j),$E(q),l=function $(){var n;for($L(D,j.max_code),$L(F,q.max_code),$E(B),n=18;n>=3&&0===V[$a[n]].dl;n--);return Y+=3*(n+1)+5+5+4,n}(),n=Y+3+7>>3,(f=Z+3+7>>3)<=n&&(n=f),_+4<=n&&d>=0)for($T(0+$,3),$V(),$3(_),$3(~_),e=0;e<_;e++)$s(t[d+e]);else f===n?($T(2+$,3),$F(T,U)):($T(4+$,3),function $(n,f,l){var _;for($T(n-257,5),$T(f-1,5),$T(l-4,4),_=0;_<l;_++)$T(V[$a[_]].dl,3);$z(D,n-1),$z(F,f-1)}(j.max_code+1,q.max_code+1,l+1),$F(D,F));$y(),0!==$&&$V()}function $D($,n){if(i[Q++]=n,0===$?D[n].fc++:($--,D[K[n]+256+1].fc++,F[$v($)].fc++,o[R++]=$,W|=X),X<<=1,(7&Q)==0&&(P[S++]=W,W=0,X=1),L>2&&(4095&Q)==0){var f,l=8*Q,_=b-d;for(f=0;f<30;f++)l+=F[f].fc*(5+$c[f]);if(l>>=3,R<parseInt(Q/2,10)&&l<parseInt(_/2,10))return!0}return 8191===Q||8192===R}function $F($,n){var f,l,_,e,r=0,t=0,u=0,c=0;if(0!==Q)do(7&r)==0&&(c=P[u++]),l=255&i[r++],(1&c)==0?$h(l,$):($h((_=K[l])+256+1,$),0!==(e=$0[_])&&$T(l-=N[_],e),$h(_=$v(f=o[t++]),n),0!==(e=$c[_])&&$T(f-=O[_],e)),c>>=1;while(r<Q);$h(256,$)}function $T($,n){a>16-n?($3(c|=$<<a),c=$>>16-a,a+=n-16):(c|=$<<a,a+=n)}function $U($,n){var f=0;do f|=1&$,$>>=1,f<<=1;while(--n>0);return f>>1}function $V(){a>8?$3(c):a>0&&$s(c),c=0,a=0}RawDeflate.deflate=function _(e,r){var c,a;$$=e,$n=0,void 0===r&&(r=6),function _(e){var r;if(e?e<1?e=1:e>9&&(e=9):e=6,L=e,l=!1,y=!1,null===$r){for(r=0,$=n=f=null,$r=[],t=[],o=[],i=[],u=[],D=[];r<$_;r++)D[r]=new $t;for(r=0,F=[];r<61;r++)F[r]=new $t;for(r=0,T=[];r<288;r++)T[r]=new $t;for(r=0,U=[];r<30;r++)U[r]=new $t;for(r=0,V=[];r<39;r++)V[r]=new $t;j=new $o,q=new $o,B=new $o,C=[],G=[],J=[],K=[],M=[],N=[],O=[],P=[]}}(r),a=[];do c=$b(a,a.length,1024);while(c>0);return $$=null,a},RawDeflate.DEFAULT_LEVEL=6}();
!function(){var $,_,t,r,f,n,i,e,o,u,s,l,h,a,x,c,b,w=null,m=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],A=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],B=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],M=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],X=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],v=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function d(){this.next=null,this.list=null}function k(){this.e=0,this.b=0,this.n=0,this.t=null}function g($,_,t,r,f,n){this.BMAX=16,this.N_MAX=288,this.status=0,this.root=null,this.m=0;var i,e,o,u,s,l,h,a,x,c,b,w,m,A,B,M,X,v=[],g=[],H=new k,N=[],p=[],j=[];for(l=0,X=this.root=null;l<this.BMAX+1;l++)v[l]=0;for(l=0;l<this.BMAX+1;l++)g[l]=0;for(l=0;l<this.BMAX;l++)N[l]=null;for(l=0;l<this.N_MAX;l++)p[l]=0;for(l=0;l<this.BMAX+1;l++)j[l]=0;e=_>256?$[256]:this.BMAX,x=$,c=0,l=_;do v[x[c]]++,c++;while(--l>0);if(v[0]===_){this.root=null,this.m=0,this.status=0;return}for(h=1;h<=this.BMAX&&0===v[h];h++);for(a=h,n<h&&(n=h),l=this.BMAX;0!==l&&0===v[l];l--);for(u=l,n>l&&(n=l),A=1<<h;h<l;h++,A<<=1)if((A-=v[h])<0){this.status=2,this.m=n;return}if((A-=v[l])<0){this.status=2,this.m=n;return}for(v[l]+=A,j[1]=h=0,x=v,c=1,m=2;--l>0;)j[m++]=h+=x[c++];x=$,c=0,l=0;do 0!==(h=x[c++])&&(p[j[h]++]=l);while(++l<_);for(_=j[u],j[0]=l=0,x=p,c=0,s=-1,w=g[0]=0,b=null,B=0;a<=u;a++)for(i=v[a];i-- >0;){for(;a>w+g[1+s];){if(w+=g[1+s],s++,B=(B=u-w)>n?n:B,(o=1<<(h=a-w))>i+1)for(o-=i+1,m=a;++h<B&&!((o<<=1)<=v[++m]);)o-=v[m];for(w+h>e&&w<e&&(h=e-w),B=1<<h,g[1+s]=h,b=[],M=0;M<B;M++)b[M]=new k;(X=X?X.next=new d:this.root=new d).next=null,X.list=b,N[s]=b,s>0&&(j[s]=l,H.b=g[s],H.e=16+h,H.t=b,h=(l&(1<<w)-1)>>w-g[s],N[s-1][h].e=H.e,N[s-1][h].b=H.b,N[s-1][h].n=H.n,N[s-1][h].t=H.t)}for(H.b=a-w,c>=_?H.e=99:x[c]<t?(H.e=x[c]<256?16:15,H.n=x[c++]):(H.e=f[x[c]-t],H.n=r[x[c++]-t]),o=1<<a-w,h=l>>w;h<B;h+=o)b[h].e=H.e,b[h].b=H.b,b[h].n=H.n,b[h].t=H.t;for(h=1<<a-1;(l&h)!=0;h>>=1)l^=h;for(l^=h;(l&(1<<w)-1)!==j[s];)w-=g[s],s--}this.m=g[1],this.status=0!==A&&1!==u?1:0}function H(){return c.length===b?-1:255&c[b++]}function N($){for(;i<$;)n|=H()<<i,i+=8}function p($){return n&m[$]}function j($){n>>=$,i-=$}function q(t,r,f){var n,i,o;if(0===f)return 0;for(o=0;;){for(N(a),n=(i=l.list[p(a)]).e;n>16;){if(99===n)return -1;j(i.b),N(n-=16),n=(i=i.t[p(n)]).e}if(j(i.b),16===n){if(_&=32767,t[r+o++]=$[_++]=i.n,o===f)return f;continue}if(15===n)break;for(N(n),u=i.n+p(n),j(n),N(x),n=(i=h.list[p(x)]).e;n>16;){if(99===n)return -1;j(i.b),N(n-=16),n=(i=i.t[p(n)]).e}for(j(i.b),N(n),s=_-i.n-p(n),j(n);u>0&&o<f;)u--,s&=32767,_&=32767,t[r+o++]=$[_++]=$[s++];if(o===f)return f}return e=-1,o}function y(t,r,f){var o;if(j(o=7&i),N(16),o=p(16),j(16),N(16),o!==(65535&~n))return -1;for(j(16),u=o,o=0;u>0&&o<f;)u--,_&=32767,N(8),t[r+o++]=$[_++]=p(8),j(8);return 0===u&&(e=-1),o}function z($,_,n){if(!w){var i,e,o=[];for(i=0;i<144;i++)o[i]=8;for(;i<256;i++)o[i]=9;for(;i<280;i++)o[i]=7;for(;i<288;i++)o[i]=8;if(r=7,0!==(e=new g(o,288,257,A,B,r)).status)return console.error("HufBuild error: "+e.status),-1;for(i=0,w=e.root,r=e.m;i<30;i++)o[i]=5;if(f=5,(e=new g(o,30,0,M,X,f)).status>1)return w=null,console.error("HufBuild error: "+e.status),-1;t=e.root,f=e.m}return l=w,h=t,a=r,x=f,q($,_,n)}function C($,_,t){var r,f,n,i,e,o,u,s,c,b=[];for(r=0;r<316;r++)b[r]=0;if(N(5),u=257+p(5),j(5),N(5),s=1+p(5),j(5),N(4),o=4+p(4),j(4),u>286||s>30)return -1;for(f=0;f<o;f++)N(3),b[v[f]]=p(3),j(3);for(;f<19;f++)b[v[f]]=0;if(a=7,0!==(c=new g(b,19,19,null,null,a)).status)return -1;for(l=c.root,a=c.m,i=u+s,r=n=0;r<i;)if(N(a),j(f=(e=l.list[p(a)]).b),(f=e.n)<16)b[r++]=n=f;else if(16===f){if(N(2),f=3+p(2),j(2),r+f>i)return -1;for(;f-- >0;)b[r++]=n}else if(17===f){if(N(3),f=3+p(3),j(3),r+f>i)return -1;for(;f-- >0;)b[r++]=0;n=0}else{if(N(7),f=11+p(7),j(7),r+f>i)return -1;for(;f-- >0;)b[r++]=0;n=0}if(a=9,c=new g(b,u,257,A,B,a),0===a&&(c.status=1),0!==c.status&&1!==c.status)return -1;for(r=0,l=c.root,a=c.m;r<s;r++)b[r]=b[r+u];return(x=6,h=(c=new g(b,s,0,M,X,x)).root,0===(x=c.m)&&u>257||0!==c.status)?-1:q($,_,t)}function D(t,r,f){var n,i;for(n=0;n<f&&(!o||-1!==e);){if(u>0){if(0!==e)for(;u>0&&n<f;)u--,s&=32767,_&=32767,t[r+n++]=$[_++]=$[s++];else{for(;u>0&&n<f;)u--,_&=32767,N(8),t[r+n++]=$[_++]=p(8),j(8);0===u&&(e=-1)}if(n===f)break}if(-1===e){if(o)break;N(1),0!==p(1)&&(o=!0),j(1),N(2),e=p(2),j(2),l=null,u=0}switch(e){case 0:i=y(t,r+n,f-n);break;case 1:i=l?q(t,r+n,f-n):z(t,r+n,f-n);break;case 2:i=l?q(t,r+n,f-n):C(t,r+n,f-n);break;default:i=-1}if(-1===i){if(o)return 0;return -1}n+=i}return n}RawDeflate.inflate=function t(r){var f,h=[];$||($=[]),_=0,n=0,i=0,e=-1,o=!1,u=s=0,l=null,c=r,b=0;do f=D(h,h.length,1024);while(f>0);return c=null,h}}();

(() => {
    // region Getting Modules
    const modules = {};
    const imodules = {};
    const refs = [];
    function patch(module, callback) {
        refs.push([module, callback]);
    }
    const pfc = Function.prototype.call;
    Function.prototype.call = function(...e) {
        pfc.apply(this, e);
        let exports = e[2];
        if (exports !== undefined && exports.__esModule === true) {
            let emodules = Object.getOwnPropertyNames(exports);
            emodules.splice(emodules.indexOf('__esModule'), 1);
            emodules.forEach((emodule) => {
                refs.forEach(([module, callback]) => {
                    if (module === emodule) exports[emodule] = callback(exports[emodule]);
                });
                if (typeof exports[emodule] === 'function' && /^\s*class\s+/.test(exports[emodule].toString())) {
                    exports[emodule] = class IModuleProxy extends exports[emodule] {
                        constructor(...args) {
                            super(...args);
                            imodules[emodule] = this;
                        }
                    }
                }
                modules[emodule] = exports[emodule];
            });
        }
    }
    // endregion
    class LayersDLC {
        constructor() {
            this.ACTIVE_LAYER_ALPHA = 1;
            this.INACTIVE_LAYER_ALPHA = 0.5;
            this.ACTIVE_BLUEPRINT_LAYER_ALPHA = 0.7;
            this.INACTIVE_BLUEPRINT_LAYER_ALPHA = 0.2;
            this.current_layer = 0;
        }

        getCurrentLayerForPlace() {
            if (this.current_layer === -1) return 0;
            return this.current_layer;
        }

        canForceArrowEdit(arrow) {
            return (arrow && !this.isArrowOnCurrentLayer(arrow) && arrow.type !== 0) && this.tryForceEdit();
        }

        tryForceEdit() {
            return (imodules.PlayerControls.keyboardHandler && !imodules.PlayerControls.keyboardHandler.getShiftPressed() && !imodules.PlayerControls.keyboardHandler.getCtrlPressed());
        }

        canResetArrowLayer() {
            return this.current_layer !== -1 && (imodules.PlayerControls.keyboardHandler && imodules.PlayerControls.keyboardHandler.getCtrlPressed());
        }

        isArrowOnCurrentLayer(arrow) {
            return ((arrow.layer || 0) === this.current_layer || this.current_layer === -1);
        }

        getLayer(layer, def) {
            if (layer === undefined) return def;
            return layer;
        }
    }
    ldlc = new LayersDLC();
    // region Modifying Modules
    patch('save', (_) => function(gameMap) {
        const data = [];
        data.push(0, 0); // ВЕРСИЯ ИГРЫ ( ПОКА ЧТО НЕ МЕНЯЕТСЯ )
        data.push(255 & gameMap.chunks.size, gameMap.chunks.size >> 8 & 255);
        gameMap.chunks.forEach((chunk) => {
            const types = chunk.getArrowTypes();
            const x = [255 & Math.abs(chunk.x), Math.abs(chunk.x) >> 8 & 255];
            const y = [255 & Math.abs(chunk.y), Math.abs(chunk.y) >> 8 & 255];
            chunk.x < 0 ? x[1] |= 128 : x[1] &= 127;
            chunk.y < 0 ? y[1] |= 128 : y[1] &= 127;
            data.push(...x);
            data.push(...y);
            data.push(types.length - 1);
            types.forEach((arrowType) => {
                data.push(arrowType);
                data.push(0);
                const n = data.length - 1;
                let o = 0;
                for (let x = 0; x < modules.CHUNK_SIZE; x++) {
                    for (let y = 0; y < modules.CHUNK_SIZE; y++) {
                        const arrow = chunk.getArrow(x, y);
                        if (arrow.type === arrowType) {
                            const e = x | y << 4;
                            const s = arrow.rotation | (arrow.flipped ? 1 : 0) << 2;
                            data.push(e);
                            data.push(s);
                            o++;
                        }
                    }
                }
                data[n] = o - 1;
            });
        });
        const layerData = [];
        let chunksCount = 0;
        layerData.push(0, 0);
        layerData.push(255 & chunksCount);
        layerData.push(chunksCount >> 8 & 255);
        gameMap.chunks.forEach((chunk) => {
            const layers = [];
            chunk.arrows.forEach((arrow) => {
                if (arrow.type === 0) return;
                const layer = ldlc.getLayer(arrow.layer, 0);
                if (layer === 0 || layers.includes(layer)) return;
                layers.push(layer);
            })
            if (layers.length === 0) return;

            const x = [255 & Math.abs(chunk.x), Math.abs(chunk.x) >> 8 & 255];
            const y = [255 & Math.abs(chunk.y), Math.abs(chunk.y) >> 8 & 255];
            chunk.x < 0 ? x[1] |= 128 : x[1] &= 127;
            chunk.y < 0 ? y[1] |= 128 : y[1] &= 127;
            layerData.push(...x);
            layerData.push(...y);
            layerData.push(layers.length - 1)
            layers.forEach((layer) => {
                let arrowsOnLayer = 0;
                layerData.push(layer);
                layerData.push(arrowsOnLayer - 1);
                const n = layerData.length - 1;
                for (let x = 0; x < modules.CHUNK_SIZE; x++) {
                    for (let y = 0; y < modules.CHUNK_SIZE; y++) {
                        const arrow = chunk.getArrow(x, y);
                        if (arrow.type === 0) continue;
                        const arrowLayer = ldlc.getLayer(arrow.layer, 0);
                        if (arrowLayer !== layer) continue;
                        layerData.push(x | y << 4);
                        arrowsOnLayer += 1;
                    }
                }
                layerData[n] = arrowsOnLayer - 1;
            });
            chunksCount += 1;
        });
        layerData[0] = 255 & chunksCount;
        layerData[1] = chunksCount >> 8 & 255;

        const compressedLayerData = RawDeflate.deflate(new Uint8Array(layerData), 9);
        data.push(...compressedLayerData)

        console.log("Raw layers length:", layerData.length)
        console.log("Compressed layers length:", compressedLayerData.length)
        console.log("Total length:", data.length)

        return data;
    });
    patch('load', (_) => function(gameMap, data) {
        if (data.length < 4) return;

        let s = 0;
        let version = data[s++];
        version |= data[s++] << 8
        if (version !== 0) throw new Error("Unsupported save version");

        let chunks_count = data[s++] | data[s++] << 8;
        for (let _ = 0; _ < chunks_count; _++) {
            let x = data[s++];
            x |= (127 & data[s++]) << 8;
            if ((data[s - 1] & 128) !== 0) x = -x;

            let y = data[s++];
            y |= (127 & data[s++]) << 8;
            if ((data[s - 1] & 128) !== 0) y = -y;

            const arrows_count = data[s++] + 1;
            const chunk = gameMap.getOrCreateChunk(x, y)
            for (let _ = 0; _ < arrows_count; _++) {
                let type = data[s++];
                const count = data[s++] + 1;
                for (let adata = 0; adata < count; adata++) {
                    const i = data[s++];
                    const n = data[s++];
                    const x = 15 & i;
                    const y = i >> 4;
                    const arrow = chunk.getArrow(x, y);
                    arrow.type = type;
                    arrow.rotation = 3 & n;
                    arrow.flipped = 0 !== (4 & n);
                    arrow.layer = 0;
                }
            }
        }
        if (data.length - 1 === s) return;

        const compressedLayerData = data.slice(s);
        const layerData = RawDeflate.inflate(new Uint8Array(compressedLayerData));
        s = 0;
        let ldlcSaveVersion = data[s++];
        ldlcSaveVersion |= data[s++] << 8

        if (ldlcSaveVersion !== 0) throw new Error("Unsupported ldlc save version");

        const layer_chunks_count = layerData[s++] | layerData[s++] << 8;
        for (let _ = 0; _ < layer_chunks_count; _++) {
            let x = layerData[s++];
            x |= (127 & layerData[s++]) << 8;
            if ((layerData[s - 1] & 128) !== 0) x = -x;

            let y = layerData[s++];
            y |= (127 & layerData[s++]) << 8;
            if ((layerData[s - 1] & 128) !== 0) y = -y;

            const layers = layerData[s++] + 1;
            const chunk = gameMap.getChunk(x, y)

            for (let _ = 0; _ < layers; _++) {
                const layer = layerData[s++];
                const arrowsCount = layerData[s++] + 1;
                for (let _ = 0; _ < arrowsCount; _++) {
                    const i = layerData[s++];
                    const x = 15 & i;
                    const y = i >> 4;
                    chunk.getArrow(x, y).layer = layer;
                }
            }
        }

        console.log("Compressed layers length:", compressedLayerData.length)
        console.log("Decompressed layers length:", layerData.length)
        console.log("Total length:", data.length)
    });
    patch('Game', (_Game) => class Game extends _Game {
        draw() {
        this.updateFocus();
        (this.drawPastedArrows || 0 !== this.selectedMap.getSelectedArrows().length) && (this.screenUpdated = !0);
        modules.PlayerSettings.framesToUpdate[this.updateSpeedLevel] > 1 && (this.screenUpdated = !0);
        this.screenUpdated && this.render.drawBackground(this.scale, [-this.offset[0] / modules.CELL_SIZE, -this.offset[1] / modules.CELL_SIZE]);
        const e = this.scale;
        this.render.prepareArrows(e);
        const t = ~~(-this.offset[0] / modules.CELL_SIZE / 16) - 1,
            s = ~~(-this.offset[1] / modules.CELL_SIZE / 16) - 1,
            o = ~~(-this.offset[0] / modules.CELL_SIZE / 16 + this.width / this.scale / 16),
            a = ~~(-this.offset[1] / modules.CELL_SIZE / 16 + this.height / this.scale / 16);
        if (this.gameMap.chunks.forEach((e => {
                if (!(e.x >= t && e.x <= o && e.y >= s && e.y <= a)) return;
                const r = this.offset[0] * this.scale / modules.CELL_SIZE + .025 * this.scale,
                    l = this.offset[1] * this.scale / modules.CELL_SIZE + .025 * this.scale;
                for (let t = 0; t < modules.CHUNK_SIZE; t++)
                    for (let s = 0; s < modules.CHUNK_SIZE; s++) {
                        const o = e.getArrow(t, s);
                        if ((o.layer || 0) == ldlc.current_layer || ldlc.current_layer === -1) {
                            this.render.setArrowAlpha(ldlc.ACTIVE_LAYER_ALPHA);
                        } else {
                            this.render.setArrowAlpha(ldlc.INACTIVE_LAYER_ALPHA);
                        }
                        if (o.type > 0 && (this.screenUpdated || modules.ChunkUpdates.wasArrowChanged(o))) {
                            const i = (e.x * modules.CHUNK_SIZE + t) * this.scale + r,
                                a = (e.y * modules.CHUNK_SIZE + s) * this.scale + l;
                            this.render.drawArrow(i, a, o.type, o.signal, o.rotation, o.flipped)
                        }
                    }
            })), performance.now() - this.drawTime > 1e3 && (this.drawTime = performance.now(), this.drawsPerSecond = 0), this.drawsPerSecond++, this.drawPastedArrows) {
            const e = this.selectedMap.getCopiedArrows();
            0 !== e.size && (this.screenUpdated = !0), e.forEach(((e, t) => {
                if (ldlc.canForceArrowEdit(e) && e.layer !== undefined) {
                    this.render.setArrowAlpha(ldlc.INACTIVE_BLUEPRINT_LAYER_ALPHA);
                }
                else {
                    this.render.setArrowAlpha(ldlc.ACTIVE_BLUEPRINT_LAYER_ALPHA);
                }
                const [s, i] = t.split(",").map((e => parseInt(e, 10)));
                let o = s,
                    a = i,
                    r = 0;
                1 === this.pasteDirection ? (o = -i, a = s, r = 1) : 2 === this.pasteDirection ? (o = -s, a = -i, r = 2) : 3 === this.pasteDirection && (o = i, a = -s, r = 3);
                const l = (o + this.mousePosition[0]) * this.scale + this.offset[0] * this.scale / modules.CELL_SIZE + .025 * this.scale,
                    h = (a + this.mousePosition[1]) * this.scale + this.offset[1] * this.scale / modules.CELL_SIZE + .025 * this.scale;
                this.render.drawArrow(l, h, e.type, e.signal, (e.rotation + r) % 4, e.flipped)
            }))
        }
        if (this.render.disableArrows(), this.render.prepareSolidColor(), this.render.setSolidColor(.25, .5, 1, .25), this.selectedMap.getSelectedArrows().forEach((e => {
                const t = e.split(",").map((e => parseInt(e, 10))),
                    s = t[0] * this.scale + this.offset[0] * this.scale / modules.CELL_SIZE,
                    i = t[1] * this.scale + this.offset[1] * this.scale / modules.CELL_SIZE,
                        o = this.scale + .05 * this.scale;
                    this.render.drawSolidColor(s, i, o, o)
                })), this.isSelecting) {
                this.render.prepareSolidColor(), this.render.setSolidColor(.5, .5, .75, .25);
                const e = this.selectedMap.getCurrentSelectedArea();
                if (void 0 !== e) {
                    const t = e[0] * this.scale + this.offset[0] * this.scale / modules.CELL_SIZE,
                        s = e[1] * this.scale + this.offset[1] * this.scale / modules.CELL_SIZE,
                        i = e[2] - e[0],
                        o = e[3] - e[1];
                    this.render.drawSolidColor(t, s, i * this.scale, o * this.scale)
                }
            }
            this.render.disableSolidColor(), this.screenUpdated = !1, this.frame++
        }
        undoChanges(e) {
            e.changedArrows.forEach((([e, t], s) => {
                const [i, n] = s.split(",").map((e => parseInt(e, 10)));
                0 === e.type ? (this.gameMap.removeArrow(i, n, !0), this.selectedMap.deselect(i, n)) : (this.gameMap.resetArrow(i, n, !0), this.gameMap.setArrowType(i, n, e.type, !0), this.gameMap.setArrowRotation(i, n, e.rotation, !0), this.gameMap.setArrowFlipped(i, n, e.flipped, !0), this.gameMap.getArrow(i, n).layer = e.layer)
            }))
        }
        redoChanges(e) {
            e.changedArrows.forEach((([e, t], s) => {
                const [i, n] = s.split(",").map((e => parseInt(e, 10)));
                0 === t.type ? (this.gameMap.removeArrow(i, n, !0), this.selectedMap.deselect(i, n)) : (this.gameMap.resetArrow(i, n, !0), this.gameMap.setArrowType(i, n, t.type, !0), this.gameMap.setArrowRotation(i, n, t.rotation, !0), this.gameMap.setArrowFlipped(i, n, t.flipped, !0), this.gameMap.getArrow(i, n).layer = e.layer)
            }))
        }
    });
    window.imodules = imodules;
    window.modules = modules;
    patch('GameMap', (_GameMap) => class GameMap extends _GameMap {
        resetArrow(e, t, s=!0) {
            const n = this.getArrowForEditing(e, t);
            void 0 !== n && (s && !n.canBeEdited || s && modules.PlayerSettings.levelArrows.includes(n.type) || (n.type = 0,
            n.signal = 0,
            n.signalsCount = 0,
            n.rotation = 0,
            n.flipped = !1,
            n.layer = 0))
        }
        removeArrow(e, t, s=!0) {
            const n = this.getChunkByArrowCoordinates(e, t);
            if (void 0 === n)
                return;
            const o = this.getArrowForEditing(e, t);
            if (void 0 !== o) {
                if (s && !o.canBeEdited)
                    return;
                if (s && modules.PlayerSettings.levelArrows.includes(o.type))
                    return;
                o.type = 0,
                o.signal = 0,
                o.signalsCount = 0,
                o.rotation = 0,
                o.flipped = !1,
                o.layer = 0
            }
            this.clearChunkIfEmpty(n)
        }
        setArrowType(x, y, type, hz=true, force=false) {
            const chunk = this.getOrCreateChunkByArrowCoordinates(x, y);
            const ax = x - chunk.x * modules.CHUNK_SIZE;
            const ay = y - chunk.y * modules.CHUNK_SIZE;
            const arrow = chunk.getArrow(ax, ay);
            if (!force) {
                if (!hz || !arrow.canBeEdited || modules.PlayerSettings.levelArrows.includes(arrow.type)) return;
                if (ldlc.canForceArrowEdit(arrow)) return;
                if (ldlc.canResetArrowLayer()) arrow.layer = ldlc.getCurrentLayerForPlace();
            }
            if (arrow.type === type) return;
            arrow.signal = 0;
            arrow.type = type;
        }
        setArrowRotation(e, t, s, n = !0, force=false) {
            const o = this.getArrowForEditing(e, t);
            if (ldlc.canForceArrowEdit(o) && !force) return;
            if (void 0 !== o && 0 !== o.type) {
                if (n && !o.canBeEdited) return;
                if (n && modules.PlayerSettings.levelArrows.includes(o.type)) return;
                o.rotation = s
            }
        }
        setArrowFlipped(e, t, s, n = !0, force=false) {
            const o = this.getArrowForEditing(e, t);
            if (ldlc.canForceArrowEdit(o) && !force) return;
            if (void 0 !== o && 0 !== o.type) {
                if (n && !o.canBeEdited) return;
                if (n && modules.PlayerSettings.levelArrows.includes(o.type)) return;
                o.flipped = s
            }
        }
    });
    patch('ArrowData', (_ArrowData) => class ArrowData {
        constructor() {
            this.type = 0, this.rotation = 0, this.flipped = !1, this.layer = 0
        }
        static fromArrow(e) {
            const t = new modules.ArrowData();
            return void 0 === e || (t.type = e.type, t.rotation = e.rotation, t.flipped = e.flipped, t.layer = e.layer), t
        }
        static fromState(e, t, i, layer) {
            const n = new modules.ArrowData();
            return n.type = e, n.rotation = t, n.flipped = i, n.layer = layer, n
        }
        static fromCopy(e) {
            const t = new modules.ArrowData();
            return t.type = e.type, t.rotation = e.rotation, t.flipped = e.flipped, t.layer = ldlc.getLayer(e.layer, 0), t
        }
        equals(e) {
            return this.type === e.type && this.rotation === e.rotation && this.flipped === e.flipped && ldlc.getLayer(this.layer, 0) === ldlc.getLayer(e.layer, 0)
        }
    })
    patch('SelectedMap', (_SelectedMap) => class SelectedMap extends _SelectedMap {
        setArrow(e, layer=undefined) {
            const t = new modules.Arrow;
            t.type = e,
            t.rotation = 0,
            t.flipped = !1,
            t.layer = layer,
            this.arrowsToPutOriginal.clear(),
            this.arrowsToPutOriginal.set("0,0", t),
            this.rotateOrFlipArrows(this.rotationState, this.flipState)
        }
        copyFromGameMap(e) {
            this.rotationState = 0, this.flipState = !1, this.arrowsToPutOriginal.clear(), this.arrowsToPut.clear();
            let t = Number.MAX_SAFE_INTEGER,
                s = Number.MAX_SAFE_INTEGER;
            this.tempMap.clear(), this.selectedArrows.forEach((i => {
                const [n, o] = i.split(",").map((e => parseInt(e, 10))), a = e.getArrow(n, o);
                void 0 !== a && a.canBeEdited && (t = Math.min(t, n), s = Math.min(s, o))
            })), this.selectedArrows.forEach((i => {
                const [n, o] = i.split(",").map((e => parseInt(e, 10))), a = n - t, r = o - s, l = e.getArrow(n, o);
                void 0 !== l && l.canBeEdited && (this.tempMap.setArrowType(a, r, l.type, true, true), this.tempMap.setArrowRotation(a, r, l.rotation, true, true), this.tempMap.setArrowFlipped(a, r, l.flipped, true, true), this.tempMap.getArrow(a, r).layer = l.layer)
            }));
            const i = (0, modules.save)(this.tempMap);
            return modules.Utils.arrayBufferToBase64(i)
        }
        rotateOrFlipArrows(e, t) {
            this.arrowsToPut.clear(), null !== e && (this.rotationState = e), t && (this.flipState = !this.flipState), this.arrowsToPutOriginal.forEach(((e, t) => {
                let [s, i] = t.split(",").map((e => parseInt(e, 10)));
                const n = new modules.Arrow;
                n.type = e.type, n.rotation = e.rotation, n.flipped = e.flipped, n.layer = e.layer;
                let o = e.rotation;
                this.flipState && (n.flipped = !n.flipped, 1 !== n.rotation && 3 !== n.rotation || (o = (e.rotation + 2) % 4), s = -s), n.rotation = o;
                let r = s,
                    l = i;
                1 === this.rotationState ? (r = -i, l = s, n.rotation = (o + 1) % 4) : 2 === this.rotationState ? (r = -s, l = -i, n.rotation = (o + 2) % 4) : 3 === this.rotationState && (r = i, l = -s, n.rotation = (o + 3) % 4), this.arrowsToPut.set(`${r},${l}`, n)
            }))
        }
    })
    patch('PlayerUI', (_PlayerUI) => class PlayerUI extends _PlayerUI {
        constructor(e) {
            super(e);
            imodules.PlayerUI = this;
        }
    })
    patch('PlayerControls', (_PlayerControls) => class PlayerControls extends _PlayerControls {
        constructor(e, t, s, i) {
            super(e, t, s, i);
            const pKDC = this.keyDownCallback;
            this.keyDownCallback = (e, t) => {
                if (e === 'KeyG') {
                    ldlc.current_layer -= 1;
                    if (ldlc.current_layer <= -1) ldlc.current_layer = -1;
                    ShowCurrentLayer();
                    imodules.Game.screenUpdated = true;
                }
                else if (e === 'KeyT') {
                    ldlc.current_layer += 1;
                    if (ldlc.current_layer >= 255) ldlc.current_layer = 255;
                    ShowCurrentLayer();
                    imodules.Game.screenUpdated = true;
                }
                else if (e === 'KeyU') {
                    ldlc.current_layer = 0;
                    ShowCurrentLayer();
                    imodules.Game.screenUpdated = true;
                }
                pKDC(e, t);
            }
            this.keyboardHandler.keyDownCallback = this.keyDownCallback;
            ShowCurrentLayer();
        }
        takeArrow(e) {
            this.activeArrowType = e,
            this.playerUI.toolbarController.activateItem(e),
            this.freeCursor = !1,
            this.game.selectedMap.setArrow(e, undefined),
            this.game.drawPastedArrows = !0
        }
        deleteArrow(e, t) {
            if (!imodules.PlayerAccess.canDelete) return;
            const arrow = this.game.gameMap.getArrow(e, t);
            if (ldlc.canForceArrowEdit(arrow)) return;
            const s = modules.ArrowData.fromArrow(arrow),
                i = modules.ArrowData.fromState(0, 0, !1, 0);
            null !== this.history && this.history.addChange(e, t, s, i), this.game.gameMap.removeArrow(e, t), this.game.selectedMap.deselect(e, t), this.game.screenUpdated = !0
        }
        deleteSelectedArrows() {
            this.playerAccess.canDelete && (this.game.selectedMap.getSelectedArrows().forEach((e => {
                const [t, s] = e.split(",").map((e => parseInt(e, 10)));
                const arrow = this.game.gameMap.getArrow(t, s);
                if (ldlc.canForceArrowEdit(arrow)) return;
                const i = modules.ArrowData.fromArrow(arrow), n = modules.ArrowData.fromState(0, 0, !1, 0);
                null !== this.history && this.history.addChange(t, s, i, n), this.game.gameMap.removeArrow(t, s)
            })), this.game.selectedMap.clear(), this.game.screenUpdated = !0)
        }
        setArrows(e, t) {
            imodules.PlayerAccess.canSetArrows && this.game.selectedMap.getCopiedArrows().forEach(((s, i) => {
                if (modules.PlayerSettings.levelArrows.includes(s.type)) return;
                const [n, o] = i.split(",").map((e => parseInt(e, 10)));
                let arrow = this.game.gameMap.getArrow(e + n, t + o);
                if (ldlc.canForceArrowEdit(arrow)) return;
                if (ldlc.canForceArrowEdit(s) && s.layer !== undefined) return;
                const r = modules.ArrowData.fromArrow(arrow);
                const l = modules.ArrowData.fromState(s.type, s.rotation, s.flipped, s.layer);
                null !== this.history && this.history.addChange(e + n, t + o, r, l);
                this.game.gameMap.setArrowType(e + n, t + o, s.type);
                this.game.gameMap.setArrowRotation(e + n, t + o, s.rotation);
                this.game.gameMap.setArrowFlipped(e + n, t + o, s.flipped);
                arrow = this.game.gameMap.getArrow(e + n, t + o);
                arrow.layer = ldlc.getLayer(s.layer, ldlc.getCurrentLayerForPlace());
                if (ldlc.canResetArrowLayer()) arrow.layer = ldlc.getCurrentLayerForPlace();
            }))
        }
    });
    function ShowCurrentLayer() {
        modules.ControlsHintsText.MOVE[modules.LangSettings.getLanguage()] = 'Текущий слой: ' + ldlc.current_layer;
        window.modules = modules;
        window.imodules = imodules;
        if (imodules.PlayerUI) imodules.PlayerUI.updateControlsHintRights(imodules.PlayerAccess);
    }
    // endregion
})();